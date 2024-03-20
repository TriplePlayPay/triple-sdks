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
    let deviceName: String
    
    private let buttonText: [Bool: String] = [false: "connect", true: "disconnect"]
    
    @Binding var isConnected: Bool
    @Binding var tDynamo: MagTekTDynamoBLE
    
    @State var isSelected: Bool = false
    
    var body: some View {
        HStack {
            Text(deviceName); Spacer()
            Button(buttonText[isSelected]!, action: {
                if isSelected {
                    tDynamo.disconnect()
                } else {
                    tDynamo.connect()
                }
            })
        }
    }
}

struct ContentView: View {
    
    @State var isScanning: Bool = false
    @State var isConnected: Bool = false
    
    @State var tDynamo: MagTekTDynamoBLE = MagTekTDynamoBLE("testapikey")
    @State var discoveredDevices: [BTDeviceRow] = []

    let scanButtonText: [Bool: String] = [false: "start scanning", true: "cancel scan"]
    
    var body: some View {
        VStack {
            List {
                Section {
                    ForEach(discoveredDevices) { device in device }
                } header: {
                    Text("Discovered devices")
                }
            }
            
            if isScanning {
                ProgressView("looking for devices")
                    .padding()
            }
            
            Button(scanButtonText[isScanning]!, action: {
                if isScanning {
                    tDynamo.cancelDeviceDiscovery()
                } else {
                    tDynamo.startDeviceDiscovery({ deviceName in
                        discoveredDevices.append(BTDeviceRow(
                            name: deviceName,
                            isConnected: $isConnected,
                            tDynamo: $tDynamo
                        ))
                    })
                }
                isScanning = !isScanning
            }).disabled(isConnected).padding()
        }
    }
}
