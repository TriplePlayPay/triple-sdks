//
//  ContentView.swift
//  MagTekPOSDemo
//
//  Created by Parker on 3/19/24.
//

import SwiftUI
import MagTekSDK

struct BTDeviceRow: View, Identifiable {
    let id: UUID = UUID()
    let name: String
    let rssi: Int32
    
    @Binding var tDynamo: MagTekTDynamoBLE // bind from parent view
    @Binding var isConnected: Bool
    @Binding var isScanning: Bool // connecting to a device cancels the bluetooth scan
    
    @State var buttonText: String = "connect"
    @State var isSelected: Bool = false
    
    private func setConnected(_ state: Bool) {
        buttonText = state ? "disconnect" : "connect"
        isSelected = state
        isConnected = state
    }
    
    var body: some View {
        HStack {
            Text(name)
            Text(String(rssi))
            Spacer()
            Button(buttonText, action: {
                if isSelected {
                    setConnected(false)
                    tDynamo.disconnect()
                } else {
                    isScanning = false
                    buttonText = "connecting..."
                    tDynamo.connect(name, { connected in
                        setConnected(connected)
                    })
                }
            })
        }
    }
}

struct ContentView: View {
    
    @State var isTransaction: Bool = false
    @State var isConnected: Bool = false
    @State var isScanning: Bool = false

    @State var tDynamo: MagTekTDynamoBLE = MagTekTDynamoBLE("testapikey", debug: true)
    @State var discoveredDevices: [BTDeviceRow] = []
    
    @State var transactionButtonText = "Start Transaction for $1.23"
    let scanButtonText: [Bool: String] = [false: "Scan", true: "Cancel"]
    
    var body: some View {
        VStack {
            List {
                Section {
                    ForEach(discoveredDevices) { device in device }
                } header: {
                    HStack {
                        Text("discover")
                        if isScanning {
                            ProgressView()
                                .padding(.leading)
                        }
                        Spacer()
                        Button(scanButtonText[isScanning]!, action: {
                            if isScanning {
                                tDynamo.cancelDeviceDiscovery()
                            } else {
                                discoveredDevices = []
                                tDynamo.startDeviceDiscovery({ name, rssi in
                                    discoveredDevices.append(BTDeviceRow(
                                        name: name,
                                        rssi: rssi, // <- connection strength
                                        tDynamo: $tDynamo,
                                        isConnected: $isConnected,
                                        isScanning: $isScanning
                                    ))
                                })
                            }
                            isScanning = !isScanning
                        }).disabled(isConnected)
                        
                    }.padding(.bottom)
                }
            }

            Button(transactionButtonText, action: {
                if isTransaction {
                    transactionButtonText = "Start Transaction for $1.23"
                    tDynamo.cancelTransaction()
                } else {
                    transactionButtonText = "Cancel"
                    tDynamo.startTransaction("1.23")
                }
                isTransaction = !isTransaction
            }).font(.system(size: 24))
                .disabled(!isConnected)
                .padding(.bottom)
        }
    }
}
