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
    
    @Binding var tDynamo: MagTekCardReader // bind from parent view
    @Binding var isScanning: Bool // connecting to a device cancels the bluetooth scan
    @Binding var isConnected: Bool
    
    @State var buttonText: String = "Connect"
    @State var isSelected: Bool = false
    
    private func setConnected(_ state: Bool) {
        buttonText = state ? "Disconnect" : "Connect"
        isSelected = state
        isConnected = state
    }
    
    var body: some View {
        HStack {
            Text(name)
            Text(String(rssi))
            Spacer()
            Button(buttonText, action: {
                buttonText = "Connecting..."
                if isSelected {
                    setConnected(false)
                    tDynamo.disconnect()
                } else {
                    isScanning = false
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

    @State var tDynamo: MagTekCardReader = MagTekCardReader("testapikey", debug: true)
    @State var discoveredDevices: [BTDeviceRow] = []
    
    @State var transactionButtonText: String = "Start Transaction for $1.23"
    @State var scanButtonTextChoices: [Bool: String] = [false: "Scan", true: "Cancel"]
    @State var transactionMessage: String = ""
    @State var transactionStatus: String = ""
    @State var transactionEvent: String = ""
    
    var body: some View {
        VStack {
            List {
                Section {
                    ForEach(discoveredDevices) { device in device }
                } header: {
                    HStack {
                        Text("devices")
                        if isScanning {
                            ProgressView()
                                .padding(.leading)
                        }
                        Spacer()
                        Button(scanButtonTextChoices[isScanning]!, action: {
                            if isScanning {
                                tDynamo.cancelDeviceDiscovery()
                            } else {
                                discoveredDevices = []
                                tDynamo.startDeviceDiscovery({ name, rssi in
                                    discoveredDevices.append(BTDeviceRow(
                                        name: name, // <- type + serial number
                                        rssi: rssi, // <- connection strength
                                        // *** refs to pass to the subview
                                        tDynamo: $tDynamo,
                                        isScanning: $isScanning,
                                        isConnected: $isConnected
                                    ))
                                })
                            }
                            isScanning = !isScanning
                        }).disabled(isConnected)
                        
                    }.padding(.bottom)
                }
            }
            
            if isTransaction {
                Text(transactionEvent)
                Text(transactionStatus)
                Text(transactionMessage)
                    .padding()
            }

            Button(transactionButtonText, action: {
                transactionButtonText = "Loading..."
                if isTransaction {
                    transactionButtonText = "Start Transaction for $1.23"
                    tDynamo.cancelTransaction()
                } else {
                    transactionButtonText = "Cancel Transaction"
                    tDynamo.startTransaction("1.23", { message, event, status in
                        if event == .complete {
                            transactionButtonText = "Start Transaction for $1.23"
                            isTransaction = false
                        }
                        transactionEvent = "Event: " + MagTekCardReader.getEventMessage(event)
                        transactionStatus = "Status: " + MagTekCardReader.getStatusMessage(status)
                        transactionMessage = message
                    })
                }
                isTransaction = !isTransaction
            }).font(.system(size: 20))
                .disabled(!isConnected)
                .padding()
                .foregroundStyle(.white)
                .background(isConnected ? .blue : .gray)
                .cornerRadius(25)
        }
    }
}
