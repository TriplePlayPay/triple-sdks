//
//  ContentView.swift
//  ugh
//
//  Created by Parker on 3/10/24.
//

import SwiftUI
import MagTekSDK

struct DeviceRow: View, Identifiable {
    let id: UUID // required for List view
    
    let deviceName: String
    let cardReader: MagTekBLE
    
    @Binding var isConnected: Bool
    @State var connectedText: String = "connect"
    
    var body: some View {
        HStack {
            Text(deviceName)
            Spacer()
            Button(connectedText, action: {
                if (isConnected) {
                    cardReader.disconnect()
                    isConnected = cardReader.isConnected()
                    connectedText = isConnected ? "disconnect" : "connect"
                } else {
                    cardReader.stopBluetoothScan()
                    cardReader.connect(
                        deviceName: deviceName,
                        timeout: 5000,
                        onConnected: { status in
                            isConnected = status
                            connectedText = isConnected ? "disconnect" : "connect"
                        })
                    connectedText = "connecting"
                }
            }).buttonStyle(BorderlessButtonStyle())
        }
    }
}

struct ContentView: View {
    
    let cardReader: MagTekBLE = MagTekBLE(apiKey: "testkey")
    
    @State var deviceList: Array<DeviceRow> = []
    
    @State var buttonText: String = "Scan for devices"
    
    @State var connected: Bool = false
    @State var scanning: Bool = false
    
    var body: some View {
        VStack {
            List {
                Section {
                    ForEach(deviceList) { deviceRow in deviceRow }
                } header: { Text("Scanned Device List") }
                
                if connected {
                    Section {
                        Text(cardReader.getDeviceInfo())
                    } header: { Text("Connected Device Info") }
                }
            }
            
            if scanning { ProgressView().padding() }
            
            Button(buttonText, action: {
                if (cardReader.isScanning()) {
                    buttonText = "Scan for devices"
                    cardReader.stopBluetoothScan()
                } else {
                    buttonText = "Cancel"
                    deviceList.removeAll()
                    cardReader.startBluetoothScan(onDiscovered: { deviceName in
                        deviceList.append(DeviceRow(
                            id: UUID(),
                            deviceName: deviceName,
                            cardReader: cardReader,
                            isConnected: $connected
                        ))
                    })
                }
                scanning = cardReader.isScanning()
            })
            .disabled(connected)
            .padding()
            
            Button("Clear device list", action: { self.deviceList = [] })
                .disabled(connected)
        }
    }
}
