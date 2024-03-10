import Foundation

public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    private let lib: MTSCRA = MTSCRA()
    private let key: String
    
    public init(key: String) {
        self.key = key
    }
}
