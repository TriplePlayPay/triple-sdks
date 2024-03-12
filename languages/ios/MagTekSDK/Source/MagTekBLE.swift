import Foundation

func toN12(amount: String) -> NSData {
    /* TODO:
     * convert dollar amount string into proper
     * N12 encoded byte-string
     */
    return NSData() // return a format acceptable by lib.startTransaction
}

public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    
    private var scanningForDevices: Bool = false
    private var devices: [String: String] = [:]
    
    enum MagTekCommand: String {
        case setMSR = "580101"
        case setBLE = "480101"
    }
    
    private let apiKey: String
    public init(apiKey: String) {
        MTSCRA.enableDebugPrint(true)
        
        self.apiKey = apiKey // ties this device to the client
        
        self.lib.setConnectionType(UInt(BLE_EMV))
        self.lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
    }
    
    public func isConnected() -> Bool { self.lib.isDeviceOpened() && self.lib.isDeviceConnected() }
    public func isScanning() -> Bool { scanningForDevices }
    
    public func connect(deviceName: String, timeout: UInt32, onConnected: @escaping (Bool) -> ()) {
        self.lib.setAddress(devices[deviceName])
        self.lib.openDevice()
        
        DispatchQueue.main.asyncAfter(deadline: .now(), execute: {
            var remaining = timeout
            while remaining > 0 && !self.isConnected() {
                usleep(timeout * 100)
                remaining -= 1
            }

            if self.isConnected() {
                self.lib.sendCommandSync(MagTekCommand.setMSR.rawValue)
                self.lib.sendCommandSync(MagTekCommand.setBLE.rawValue)
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
                if let deviceName = device.name {
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
        Product ID: \(self.lib.getProductID())
        Firmware: \(self.lib.getFirmware() ?? "ERROR")
        S/N: \(self.lib.getDeviceSerial() ?? "ERROR")
        Total transactions: \(self.lib.getSwipeCount())
        """
    }
    
    public func startTransaction(amount: String) {
        
    }
}
