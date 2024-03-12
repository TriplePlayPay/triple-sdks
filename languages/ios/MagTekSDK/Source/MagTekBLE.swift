import Foundation

open class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    private let apiKey: String
    
    private var scanningForDevices: Bool = false
    private var devices: [String: String] = [:]
    
    public init(apiKey: String) {
        MTSCRA.enableDebugPrint(true)
        self.apiKey = apiKey
        
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
            onConnected(self.isConnected())
            if self.isConnected() {
                self.lib.clearBuffers()
            }
        })
    }
    
    public func disconnect() {
        self.lib.closeDevice()
    }
    
    public func startBluetoothScan(onDiscovered: @escaping (String) -> ()) {
        self.lib.startScanningForPeripherals()
        self.scanningForDevices = true
        self.devices = [:] // reset devices list
                
        Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true, block: { timer in
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
    
    public func startTransaction(amount: Double) {}
}
