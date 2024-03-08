//
//  ContentView.swift
//  MagTekPOS
//
//  Created by Parker on 3/8/24.
//

import SwiftUI
import MagTekSDK

struct ContentView: View {
    
    var device: MagTekDevice = MagTekDevice(key: "hello")
    
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("ugh")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
