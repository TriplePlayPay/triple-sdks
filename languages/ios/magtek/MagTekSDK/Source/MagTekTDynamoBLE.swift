import Foundation

public enum MagTekConnectionState { case connected, connecting, disconnecting, disconnected }

class MagTekBLEController: NSObject, MTSCRAEventDelegate {
    private let devices: [String: String] = [:]
    
    private var bleState: MTSCRABLEState?
    private var scanning: Bool = false
    
    // callback declarations
    private var onConnectionStateChange: (MagTekConnectionState) -> () = { connectionState in }
    private var onDeviceDiscovered: (String) -> () = { deviceName in }
    
    private let lib: MTSCRA = MTSCRA() // <- fuck you
    public init(_ deviceType: Int) {
        super.init()
        lib.setDeviceType(UInt32(deviceType))
        lib.setConnectionType(UInt(BLE_EMV))
        lib.delegate = self
    }
    
    // overrides
    func bleReaderStateUpdated(_ state: MTSCRABLEState) { self.bleState = state }
    func onDeviceList(_ instance: Any!, connectionType: UInt, deviceList: [Any]!) {
        for device in deviceList {
            print(device)
        }
    }

    // allow callbacks for higher order class to be set
    public func setOnConnectionStateChange(_ callback: @escaping (MagTekConnectionState) -> ()) {
        self.onConnectionStateChange = callback
    }
    
    public func setOnDeviceDiscovered(_ callback: @escaping (String) -> ()) {
        self.onDeviceDiscovered = callback
    }
    
    // public utility functions
    public func startDeviceDiscovery(_ newDevice: (String) -> ()) {
        if (bleState == 0) {
            lib.startScanningForPeripherals()
        }
    }
    
    public func cancelDeviceDiscovery() { lib.stopScanningForPeripherals() }
    
    public func connect(_ deviceName: String) {
        
    }
    
    public func disconnect() { lib.closeDeviceSync() }
}

public class MagTekTDynamoBLE {
    private let reader: MagTekBLEController = MagTekBLEController(MAGTEKTDYNAMO)
    private let apiKey: String
    
    public func startDeviceDiscovery(_ callback: (String) -> ()) { self.reader.startDeviceDiscovery(callback) }
    public func cancelDeviceDiscovery() { self.reader.cancelDeviceDiscovery() }
    
    public init(_ apiKey: String) {
        self.apiKey = apiKey
    }
    
    public func setOnConnectionStateChanged(_ callback: @escaping (MagTekConnectionState) -> ()) {
        self.reader.setOnConnectionStateChange(callback)
    }
    
    public func connect(_ deviceName: String) {
        
    }
    
    public func disconnect() {
        
    }
}
