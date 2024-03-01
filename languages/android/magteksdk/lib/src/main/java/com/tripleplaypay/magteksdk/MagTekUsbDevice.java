package com.tripleplaypay.magteksdk;


import android.content.Context;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.os.Message;
import android.os.Handler;
import android.os.Handler.Callback;

import androidx.annotation.NonNull;

import com.magtek.mobile.android.mtlib.MTConnectionState;
import com.magtek.mobile.android.mtlib.MTConnectionType;
import com.magtek.mobile.android.mtlib.MTSCRA;
import com.magtek.mobile.android.mtlib.MTSCRAEvent;

import java.util.ArrayList;
import java.util.List;


public class MagTekUsbDevice {

    private final static String TAG = MagTekUsbDevice.class.getSimpleName();

    public interface OnConnecting { void onConnecting(boolean isConnected); }
    private OnConnecting onConnectingListener;
    public void setOnConnecting(OnConnecting onConnectingListener) {
        this.onConnectingListener = onConnectingListener;
    }

    public interface OnDisconnecting { void onDisconnecting(boolean isDisconnected); }
    private OnDisconnecting onDisconnectingListener;
    public void setOnDisconnecting(OnDisconnecting onDisconnectingListener) {
        this.onDisconnectingListener = onDisconnectingListener;
    }

    private boolean isActiveTransaction = false;

    private MTSCRA cardReader;
    private Context context;
    private String apiKey; // this will be needed at some point

    public MagTekUsbDevice(Context context, String apiKey) {
        this.context = context;
        this.apiKey = apiKey;

        cardReader = new MTSCRA(context, new Handler(message -> {
            switch (message.what) {
                case MTSCRAEvent.OnDeviceConnectionStateChanged:
                    handleDeviceConnectionStateChanged((MTConnectionState) message.obj);
                    break;
            }
            return true;
        }));

        cardReader.setConnectionType(MTConnectionType.USB);
    }

    public static String[] getUsbDevices(Context context) {

        UsbManager usbManager = (UsbManager) context.getSystemService(Context.USB_SERVICE);
        if (usbManager == null)
            return new String[0];

        List<String> devices = new ArrayList<>();
        for (UsbDevice usbDevice : usbManager.getDeviceList().values()) {
            if (usbDevice.getVendorId() == 0x801)
                devices.add(usbDevice.getDeviceName());
        }

        // we like memory
        return devices.toArray(new String[0]);
    }

    public boolean startUsbConnection() {
        String[] devices = getUsbDevices(this.context);
        if (devices.length > 0) {
            startUsbConnectionWithAddress(devices[0]);
            return true;
        }
        return false;
    }

    public void startUsbConnectionWithAddress(String address) {
        if (! cardReader.isDeviceConnected()) {
            cardReader.setAddress(address);
            cardReader.openDevice();
        }
    }

    public void closeConnection() {
        if (cardReader.isDeviceConnected()) {
            cardReader.closeDevice();
        }
    }

    public void beginTransaction(float amount, MagTekTransactionType transactionType) {
        isActiveTransaction = true;
    }

    public void clearTransaction() {
        isActiveTransaction = false;
    }

    private void handleDeviceConnectionStateChanged(MTConnectionState connectionState) {
        // yeah i know the error string is just a simple static thing right now, no
        // need to have them implement the callback like this. hopefully in the future there
        // will be more info to create a meaningful error message
        switch (connectionState) {
            case Connected:
                this.onConnectingListener.onConnecting(true);
                break;
            case Connecting:
                this.onConnectingListener.onConnecting(false);
            case Disconnecting:
                this.onDisconnectingListener.onDisconnecting(false);
            case Disconnected:
                this.onDisconnectingListener.onDisconnecting(true);
                break;
            case Error:
            default:
                throw new Error("connection error");
        }
    }
}
