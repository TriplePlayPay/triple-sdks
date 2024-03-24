import Foundation

struct TLVData {
    
}

func camelCaseToCaps(_ string: String) -> String {
    return string.replacingOccurrences(of: "([A-Z])", with: " $1", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)
        .capitalized
}

func hexStringBytes(_ input: String) -> [UInt8] {
    let bytes = Array(input.utf8)
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

func parseTLV(_ data: NSData) {
    let parsedList: [String: TLVData] = [:]
    
    let moreBytesFlag: UInt8 = 0x1f
    let keepGoingFlag: UInt8 = 0x80
    let constructedFlag: UInt8 = 0x20
    let oneMoreByteFlag: UInt8 = 0x7f

    if data.count >= 2 { // i guess the minimum valid amount of bytes if 2?
        let tlvData = data.subdata(with: NSRange(location: 2, length: data.length))
        
        var tagBytes = Data() // data buffer of the 'TAG'
        let ptr = [UInt8] (tlvData) // get a casted pointer to the data
        
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
                
                tagBytes.append(&tagBuffer, count: tagIndex)
                inTag = false
            } else {
                var byte = ptr[tlvIndex] // get the byte
                var length = 0
                
                if (byte & keepGoingFlag) == keepGoingFlag { // this is rediculus
                    let lengthBytes = Int(byte & oneMoreByteFlag)
                } else {
                    length = Int(byte & oneMoreByteFlag)
                    tlvIndex += 1 // increment overall index
                }
            }
        }
    }
}
