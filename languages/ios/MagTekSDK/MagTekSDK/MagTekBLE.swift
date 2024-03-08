//
//  MagTekBLE.swift
//  MagTekSDK
//
//  Created by Parker on 3/7/24.
//

import Foundation

public class MagTekBLE: NSObject, MTSCRAEventDelegate {
    
    private let lib: MTSCRA = MTSCRA()  // initialize the MTSCRA library
    private let key: String // we'll need this at some point

    // list of discovered BLE readers [Name, Address]
    private var devices: [String: String] = [:]
    
    // state of the bluetooth LE radio
    private var bluetoothReady: Bool = false
    private var devicesScanned: Bool = false
    
    // Start the device with an API key tied to it
    init(_ key: String) {
        self.key = key

        // configure the SCRA lib for a bluetooth tDynamo
        lib.setConnectionType(UInt(BLE_EMV))
        lib.setDeviceType(UInt32(MAGTEKTDYNAMO))
    }
    
    // let the dev know if the device is ready to scan or not
    public func isReadyToScan() -> Bool {
        return bluetoothReady;
    }
    
    // scan for a time limit then return the discovered names
    public func scan(timeout: TimeInterval) -> [String] {
        if (bluetoothReady) { // start the scan if we can
            DispatchQueue.main.asyncAfter(deadline: .now(), execute: {
                self.lib.startScanningForPeripherals() // turn on the scanner
                var timeLeft = timeout;
                while (!self.devicesScanned && timeout > 0.0) {
                    timeLeft -= 0.1
                    sleep(1000)
                }
                self.devicesScanned = false
                self.lib.stopScanningForPeripherals() // turn off the scanner
            })
        } // devices.keys is empty if scanner not available
        return Array(devices.keys) // they just need the names, we'll handle the addressing
    }
    
    // connect using one of the device names returned from the scan function
    public func connect(name: String) {
        lib.setAddress(devices[name]) // set the address tied to the name
        lib.openDevice() // open a connection immediately
    }
    
    // -- MagTek CALLBACKS --
    
    // OVERRIDE: when the BLE device state changes
    public func bleReaderStateUpdated(_ state: MTSCRABLEState) {
        bluetoothReady = state == 0
    }
    
    // OVERRIDE: when the list of discovered devices is ready...
    public func onDeviceList(_ instance: Any!, connectionType: UInt, deviceList: [Any]!) {
        // create the "discovered" table Name -> Address
        for device in (deviceList as! [MTDeviceInfo]) {
            devices[device.name] = device.address // we'll handle the addessing
        }
        devicesScanned = true
    }
}
