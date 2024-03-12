import Foundation

open class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    private let apiKey: String
    
    private var scanningForDevices: Bool = false
    private var devices: [String: String] = [:]
    
    public init(apiKey: String) {
        MTSCRA.enableDebugPrint(true)
        self.apiKey = apiKey
                
        self.lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
        self.lib.setConnectionType(UInt(BLE_EMV))
    }
    
    public func isConnected() -> Bool { self.lib.isDeviceOpened() && self.lib.isDeviceConnected() }
    public func isScanning() -> Bool { scanningForDevices }
        
    public func connect(name: String, timeout: TimeInterval, onConnected: @escaping (Bool) -> ()) {
        self.lib.setAddress(devices[name])
        self.lib.openDevice()
        DispatchQueue.main.asyncAfter(deadline: .now(), execute: {
            var remaining = timeout
            while remaining > 0 {
                if self.isConnected() {
                    onConnected(true)
                }
                usleep(1000 * 100)
                remaining -= 1
            }
        })
        onConnected(self.isConnected())
    }
    
    public func disconnect() {
        self.lib.clearBuffers()
        self.lib.closeDevice()
    }
    
    public func startBluetoothScan(timeout: TimeInterval, onDiscovered: @escaping (String) -> ()) {
        self.lib.startScanningForPeripherals()
        self.scanningForDevices = true
        self.devices = [:] // reset devices list
        
        var remaining = timeout
        
        Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true, block: { timer in
            if !self.scanningForDevices && remaining > 0 { timer.invalidate() }
            
            for device in (self.lib.getDiscoveredPeripherals() as! [CBPeripheral]) {
                if let deviceName = device.name {
                    if !self.devices.keys.contains(deviceName) {
                        self.devices[deviceName] = device.identifier.uuidString
                        onDiscovered(deviceName) // report to the user we got one
                    }
                }
            }
            
            remaining = remaining - 1
        })
    }
    
    public func stopBluetoothScan() {
        self.lib.stopScanningForPeripherals()
        self.scanningForDevices = false
    }
    
    public func infoString() -> String {
        return """
        Last error: \(self.lib.getLastError())
        Product ID: \(self.lib.getProductID())
        """
    }
}
