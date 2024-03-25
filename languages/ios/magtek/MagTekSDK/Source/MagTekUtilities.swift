import Foundation

func camelCaseToCaps(_ string: String) -> String {
    return string.replacingOccurrences(of: "([A-Z])", with: " $1", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)
        .capitalized
}

func hexStringBytes(_ string: String) -> [UInt8] {
    let bytes = Array(string.utf8)
    var data: [UInt8] = []
    for i in stride(from: 1, to: bytes.count, by: 2){
        let ascii = Array<UInt8>(bytes[i - 1...i] + [0])
        let value = UInt8(strtoul(ascii, nil, 16))
        data.append(value)
    }
    return data
}

func hexString(_ data: Data, offset: Int, length: Int) -> String {
    var string = String(repeating: "\0", count: data.count * 2)
    let bytes = [UInt8](data)
    for i in offset..<(offset + length) {
        string += String(format: "%02X", bytes[i])
    }
    return string
}

func n12Bytes(_ amount: String) -> [UInt8] {
    let formattedString = String(format: "%12.0f", (Double(amount) ?? 0) * 100)
    return hexStringBytes(formattedString)
}

func getDateByteString() -> String {
    let dateComponents: Set<Calendar.Component> = [.month, .day, .hour, .minute, .second, .year]
    let date = Calendar.current.dateComponents(dateComponents, from: Date())
    let year = (date.year ?? 2008) - 2008
    let format = String(repeating: "%02lX", count: 5) + "%04lX"
    return String(format: format, date.month ?? 0, date.day ?? 0, date.hour ?? 0, date.minute ?? 0, date.second ?? 0, year)
}

func parseTLV(_ data: NSData) -> [String: Any] {
    let parsedList: [String: Any] = [:]
    
    let moreBytesFlag: UInt8 = 0x1f
    let keepGoingFlag: UInt8 = 0x80
    let constructedFlag: UInt8 = 0x20
    let oneMoreByteFlag: UInt8 = 0x7f

    if data.count < 2 { // i guess the minimum valid amount of bytes if 2?
        return [:] // just return the empty thing
    }
    
    let tlvData = data.subdata(with: NSRange(location: 2, length: data.length))
    let ptr = [UInt8] (tlvData) // get a casted pointer to the data
    var tagBytes: Data? // data buffer of the 'TAG'
    
    var inTag = true // assume we are in the tag at first
    var tlvIndex = 0 // initialize overall index
    
    while tlvIndex < tlvData.count { // while we have data left to parse
        if inTag { // parse out the tag data (this will always be attempted first)
            var tagBuffer = [UInt8] (repeating: 0, count: 50)
            var moreBytes = true
            var tagIndex = 0
            
            while (moreBytes && tlvIndex < tlvData.count) { // if the 'more bytes' flag is found and we have data left
                var byte = ptr[tlvIndex]
                tagBuffer[tagIndex] = byte // assign the tag byte at the current tag index
                
                if tagIndex == 0 { // continue the operation if the byte contains the 'more' flag
                    moreBytes = (byte & moreBytesFlag) == moreBytesFlag
                } else { // if its not the first byte, it will be a different flag
                    moreBytes = (byte & keepGoingFlag) == keepGoingFlag
                }
                
                tagIndex += 1 // increment the inner tag index
                tlvIndex += 1 // increment the overall index
            }
            
            tagBytes = Data()
            tagBytes?.append(&tagBuffer, count: tagIndex)
            inTag = false // after this we arent in a tag
        } else { // OUT OF TAG
            var byte = ptr[tlvIndex] // get the byte
            var lengthValue = 0 // default to 0
            
            // PARSE LENGTH VALUE
            if (byte & keepGoingFlag) == keepGoingFlag { // this part sucks
                let lengthBytes = Int(byte & oneMoreByteFlag)
                var lengthIndex = 0
                tlvIndex += 1 // set up the next byte
                
                while (lengthIndex < lengthBytes) && (tlvIndex < tlvData.count) {
                    byte = ptr[tlvIndex] // get the current byte
                    lengthValue = Int((lengthValue & 0x000000ff) << 8) + Int(byte & 0x000000ff)
                    lengthIndex += 1 // go to next length value position
                    tlvIndex += 1 // increment the overall index
                }
            } else {
                lengthValue = Int(byte & oneMoreByteFlag)
                tlvIndex += 1 // increment overall index
            }
            
            if tagBytes == nil {
                inTag = true
                continue // if the tag was never created, just skip back to the top
            }
            
            // parse the TLV data if there's a TAG
            let data = (tagBytes! as NSData)
            if (memcmp(data.bytes, "00", data.count) != 0) {
                let tagByte = Int([UInt8](tagBytes!)[0]) // ugly :(
            }
            
        } // END CENTRAL CASE
    } // END PARSING LOOP
    
    return parsedList
}
