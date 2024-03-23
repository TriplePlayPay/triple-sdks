import Foundation

public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    
    // disconnected
    private var scanningForDevices: Bool = false
    private var devices: [String: String] = [:]
    
    // connected
    private var deviceSerial: String = "00000000000000000000000000000000"
    private var activeTransaction: Bool = false
    
    // class callbacks
    private var onMessage: (String) -> () = { data in () }
    
    private enum MagTekCommand: String {
        case setMSR = "580101"
        case setBLE = "480101"
        case setDateTimePrefix = "030C001800"
    }
    
    override public init() {
        super.init()
        
        MTSCRA.enableDebugPrint(true)
        
        self.lib.delegate = self
        self.lib.setConnectionType(UInt(BLE_EMV))
        self.lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
    }
    

    

    

    
    public func isActiveTransaction() -> Bool { activeTransaction }
    public func isConnected() -> Bool { self.lib.isDeviceOpened() && self.lib.isDeviceConnected() }
    public func isScanning() -> Bool { scanningForDevices }
    
    public func connect(_ deviceName: String, timeout: UInt32, onConnected: @escaping (Bool) -> ()) {
        self.lib.setAddress(devices[deviceName])
        self.lib.openDevice()
        
        var remaining = timeout
        Timer.scheduledTimer(withTimeInterval: 0.001, repeats: true, block: { timer in
            if remaining == 0 { timer.invalidate() }
            
            if self.isConnected() {
                self.deviceSerial = self.lib.getDeviceSerial() ?? self.deviceSerial
                
                self.lib.sendCommandSync(MagTekCommand.setMSR.rawValue) // set MSR mode ON
                self.lib.sendCommandSync(MagTekCommand.setBLE.rawValue) // set BLE Response mode ON
                // set the date + time for EMV
                self.lib.sendCommandSync(MagTekCommand.setDateTimePrefix.rawValue + self.deviceSerial)
                
                onConnected(true) // successfully connected
                timer.invalidate()
            }
            
            remaining -= 1 // each cycle takes 0.001 seconds, so timeout is in milliseconds
        })
        
        onConnected(false) // if we got here we did not connect yet
    }
    
    public func disconnect() {
        self.lib.clearBuffers()
        self.lib.closeDevice()
    }
    
    public func startBluetoothScan(onDiscovered: @escaping (String) -> ()) {
        self.lib.startScanningForPeripherals()
        self.scanningForDevices = true
        self.devices = [:] // reset devices list
        
        Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true, block: { timer in
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
    public func getSN() -> String { return self.deviceSerial }
    
    // (amount / cashback) format example for $1.00: "1", "1.00", "1.0"
    // for $10.25: "10.25"
    public func startTransaction(amount: String, cashback: String) {
        var amountBytes = [0]
        var cashbackBytes = [0]
        var currencyCode = hexStringBytes("0840") // USD
        self.lib.startTransaction(60, // set time limit to 60 seconds
                                  cardType: 7,
                                  option: 0x80,
                                  amount: &amountBytes,
                                  transactionType: 0, // 0 = sale
                                  cashBack: &cashbackBytes,
                                  currencyCode: &currencyCode,
                                  reportingOption: 2)
        self.activeTransaction = true
    }
    
    public func cancelTransaction() {
        lib.cancelTransaction()
        self.activeTransaction = false
    }
}
