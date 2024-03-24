import Foundation

public class MagTekCardReader {
    
    public class func getEventMessage(_ event: MagTekTransactionEvent) -> String {
        return camelCaseToCaps(String(describing: event))
    }
    
    public class func getStatusMessage(_ status: MagTekTransactionStatus) -> String {
        return camelCaseToCaps(String(describing: status))
    }
    
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
    
    public func startTransaction(_ amount: String, _ callback: @escaping ((String, MagTekTransactionEvent, MagTekTransactionStatus) -> ())) {
        self.reader.onTransaction = callback
        self.reader.startTransaction(amount, cashback: "0", quickEmv: true)
    }
    
    public func cancelTransaction() {
        self.reader.cancelTransaction()
    }
}
