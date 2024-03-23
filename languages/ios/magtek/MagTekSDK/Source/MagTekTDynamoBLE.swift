import Foundation

struct MagTekBluetoothInfo {
    let name: String
    let rssi: Int32
    let address: String
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

class MagTekBLEController: NSObject, MTSCRAEventDelegate {
    private enum MagTekCommand: String {
        case setMSR = "580101"
        case setBLE = "480101"
        case setDateTimePrefix = "030C001800"
    }
    
    private var devices: [String: MagTekBluetoothInfo] = [:]
    private var deviceSerial: String = "00000000000000000000000000000000"
    
    private var bluetoothState: MTSCRABLEState?
    private var scanning: Bool = false
    
    // callback declarations
    public var onDeviceDiscovered: ((String, Int32) -> ())?
    public var onConnection: ((Bool) -> ())?
    
    private let lib: MTSCRA = MTSCRA()
    private var debug: Bool = false
    public init(_ deviceType: Int) {
        super.init()
        self.lib.setDeviceType(UInt32(deviceType))
        self.lib.setConnectionType(UInt(BLE_EMV))
        self.lib.delegate = self
    }

    // super class overrides
    func bleReaderStateUpdated(_ state: MTSCRABLEState) { self.bluetoothState = state }
    
    func onDeviceList(_ instance: Any!, connectionType: UInt, deviceList: [Any]!) {
        for device in (deviceList as! [MTDeviceInfo])  {
            if !devices.keys.contains(device.name) {
                self.devices[device.name] = MagTekBluetoothInfo(
                    name: device.name,
                    rssi: device.rssi,
                    address: device.address
                )
                self.onDeviceDiscovered?(device.name, device.rssi)
            }
        }
    }
    
    func onDeviceConnectionDidChange(_ deviceType: UInt, connected: Bool, instance: Any!) {
        self.onConnection?(connected)
    }
    
    // public utility functions
    public func startDeviceDiscovery() {
        self.devices = [:] // clear devices before scanning
        if let state = self.bluetoothState {
            if (state == 0 || state == 3) {
                self.lib.startScanningForPeripherals()
            }
        }
    }
    
    public func connect(_ deviceName: String, _ timeout: TimeInterval) {
        if let device = self.devices[deviceName] {
            self.lib.setAddress(device.address)
            self.lib.openDevice()
            DispatchQueue.main.asyncAfter(deadline: .now() + timeout, execute: {
                // at the end of the timeout, just return whatever the current connection status is
                let connected = self.lib.isDeviceConnected() && self.lib.isDeviceOpened()
                if connected {
                    self.deviceSerial = self.lib.getDeviceSerial() ?? self.deviceSerial
                    self.lib.sendCommandSync(MagTekCommand.setMSR.rawValue) // put device into MSR mode
                    self.lib.sendCommandSync(MagTekCommand.setBLE.rawValue) // set response mode to BLE
                    // set date + time for EMV
                    self.lib.sendExtendedCommandSync(MagTekCommand.setDateTimePrefix.rawValue + self.deviceSerial + getDateByteString())
                }
                self.onConnection?(connected)
            })
        }
    }
    
    public func cancelDeviceDiscovery() { self.lib.stopScanningForPeripherals() }
    public func cancelTransaction() { self.lib.cancelTransaction() }
    
    public func disconnect() {
        self.lib.clearBuffers()
        self.lib.closeDevice()
    }
    
    public func startTransaction(_ amount: String, cashback: String) {
        var amountBytes = n12Bytes(amount)
        var cashbackBytes = n12Bytes(cashback)
        var currencyCode = hexStringBytes("0840")
        
        self.lib.startTransaction(60,
            cardType: 7,
            option: 0x80,
            amount: &amountBytes,
            transactionType: 0,
            cashBack: &cashbackBytes,
            currencyCode: &currencyCode,
            reportingOption: 2)
    }
    
    // public setters
    public func setDebug(_ debug: Bool) {
        MTSCRA.enableDebugPrint(debug)
        self.debug = debug
    }
}

public class MagTekTDynamoBLE {
    private let reader = MagTekBLEController(MAGTEKTDYNAMO)
    private let apiKey: String
    
    public func startDeviceDiscovery(_ callback: @escaping (String, Int32) -> ()) {
        self.reader.onDeviceDiscovered = callback
        self.reader.startDeviceDiscovery()
    }
    
    public func cancelDeviceDiscovery() {
        self.reader.cancelDeviceDiscovery()
        self.reader.onDeviceDiscovered = nil
    }
    
    public init(_ apiKey: String, debug: Bool) {
        self.reader.setDebug(debug)
        self.apiKey = apiKey
    }
    
    public init(_ apiKey: String) {
        self.reader.setDebug(false)
        self.apiKey = apiKey
    }
    
    // supply timeout by kwarg
    public func connect(_ deviceName: String, timeout: TimeInterval, _ callback: @escaping (Bool) -> ()) {
        self.reader.onConnection = callback
        self.reader.connect(deviceName, timeout)
    }
    
    // default 10 seconds timeout
    public func connect(_ deviceName: String, _ callback: @escaping (Bool) -> ()) {
        self.reader.onConnection = callback
        self.reader.connect(deviceName, 10)
    }
    
    public func disconnect() { self.reader.disconnect() }
    
    public func startTransaction(_ amount: String) {
        self.reader.startTransaction(amount, cashback: "0")
    }
    
    public func cancelTransaction() {
        self.reader.cancelTransaction()
    }
}
