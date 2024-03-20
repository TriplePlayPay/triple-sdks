//
//  ContentView.swift
//  MagTekPOSDemo
//
//  Created by Parker on 3/19/24.
//

import SwiftUI
import MagTekSDK

struct DeviceRow: View, Identifiable {
    let id: UUID // required for List view
    
    let deviceName: String
    let cardReader: MagTekBLE

    @State var connectedText: String = "connect"
    
    @Binding var isScanning: Bool
    @Binding var isConnected: Bool
    
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
                    isScanning = false
                    cardReader.connect(deviceName,
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
    
    @State var scanButtonText: String = "Scan for devices"
    @State var transactionButtonText: String = "Start transaction"
    
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
                        Text("S/N: \(cardReader.getSN())")
                    } header: { Text("Connected Device Info") }
                    Button(transactionButtonText, action: {
                        if cardReader.isActiveTransaction() {
                            transactionButtonText = "Start transaction"
                            cardReader.cancelTransaction()
                        } else {
                            transactionButtonText = "Cancel transaction"
                            cardReader.startTransaction(amount: "1.25", cashback: "0.00")
                        }
                    }).frame(maxWidth: .infinity, alignment: .center)
                }
            }
            
            if scanning { ProgressView().padding() }
            
            Button(scanButtonText, action: {
                if (cardReader.isScanning()) {
                    scanButtonText = "Scan for devices"
                    cardReader.stopBluetoothScan()
                } else {
                    scanButtonText = "Stop scanning"
                    deviceList.removeAll()
                    cardReader.startBluetoothScan(onDiscovered: { deviceName in
                        deviceList.append(DeviceRow(
                            id: UUID(),
                            deviceName: deviceName,
                            cardReader: cardReader,
                            isScanning: $scanning,
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
