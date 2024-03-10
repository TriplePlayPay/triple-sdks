import Foundation

public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    
    override public init() {
        lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
    }
}
