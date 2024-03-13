import Foundation



public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    
    // disconnected
    private var scanningForDevices: Bool = false
    private var devices: [String: String] = [:]
    
    // connected
    private var deviceSerial: String = "00000000000000000000000000000000"
    
    private enum MagTekCommand: String {
        case setMSR = "580101"
        case setBLE = "480101"
        case setDateTimePrefix = "030C001800"
    }
    
    private let apiKey: String // only thing we really need from the user
    public init(apiKey: String) {
        MTSCRA.enableDebugPrint(true)
        
        self.apiKey = apiKey // ties this device to the client
        
        self.lib.setConnectionType(UInt(BLE_EMV))
        self.lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
    }
    
    private func toN12(fromString amount: String) -> NSData {
        /* TODO:
         * convert dollar amount string into proper
         * N12 encoded byte-string
         */
        return NSData() // return a format acceptable by lib.startTransaction
    }

    private func toN12(fromDouble amount: Double) -> NSData {
        return NSData()
    }

    private func getDateByteString() -> String {
        let dateComponents: Set<Calendar.Component> = [.month, .day, .hour, .minute, .second, .year]
        let date = Calendar.current.dateComponents(dateComponents, from: Date())
        let year = (date.year ?? 2008) - 2008
        
        let format = String(repeating: "%02lX", count: 5) + "%04lX"
        return String(format: format, date.month ?? 0, date.day ?? 0, date.hour ?? 0, date.minute ?? 0, date.second ?? 0, year)
    }
    
    public func isConnected() -> Bool { self.lib.isDeviceOpened() && self.lib.isDeviceConnected() }
    public func isScanning() -> Bool { scanningForDevices }
    
    public func connect(deviceName: String, timeout: UInt32, onConnected: @escaping (Bool) -> ()) {
        self.lib.setAddress(devices[deviceName])
        self.lib.openDevice()
        
        // do this part async so the UI in the main scope can properly update
        DispatchQueue.main.asyncAfter(deadline: .now(), execute: {
            var remaining = timeout
            while remaining > 0 && !self.isConnected() {
                usleep(timeout * 100)
                remaining -= 1
            }

            if self.isConnected() {
                self.lib.sendCommandSync(MagTekCommand.setMSR.rawValue)
                self.lib.sendCommandSync(MagTekCommand.setBLE.rawValue)
                self.lib.sendCommandSync(self.getDateByteString())
            }
            
            onConnected(self.isConnected())
        })
    }
    
    public func disconnect() {
        self.lib.clearBuffers()
        self.lib.closeDevice()
    }
    
    public func startBluetoothScan(onDiscovered: @escaping (String) -> ()) {
        self.lib.startScanningForPeripherals()
        self.scanningForDevices = true
        self.devices = [:] // reset devices list
        
        Timer.scheduledTimer(withTimeInterval: 1, repeats: true, block: { timer in
            if !self.scanningForDevices { timer.invalidate() }
            
            for device in (self.lib.getDiscoveredPeripherals() as! [CBPeripheral]) {
                if let deviceName = device.name { // unwrap maybe String
                    if !self.devices.keys.contains(deviceName) {
                        self.devices[deviceName] = device.identifier.uuidString
                        onDiscovered(deviceName) // report to the user we got one
                    }
                }
            }
        })
    }
    
    public func stopBluetoothScan() {
        self.lib.stopScanningForPeripherals()
        self.scanningForDevices = false
    }
    
    // after connection
    
    public func getDeviceInfo() -> String {
        return """
        S/N: \(self.lib.getDeviceSerial() ?? "ERROR")
        Firmware: \(self.lib.getFirmware() ?? "ERROR")
        Total transactions: \(self.lib.getSwipeCount())
        """
    }
    
    public func startTransaction(amount: String) {}
}
