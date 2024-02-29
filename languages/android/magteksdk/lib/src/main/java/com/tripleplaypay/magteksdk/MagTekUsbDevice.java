package com.tripleplaypay.magteksdk;


import android.content.Context;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.os.Message;
import android.os.Handler;
import android.os.Handler.Callback;

import com.magtek.mobile.android.mtlib.MTConnectionState;
import com.magtek.mobile.android.mtlib.MTConnectionType;
import com.magtek.mobile.android.mtlib.MTSCRA;
import com.magtek.mobile.android.mtlib.MTSCRAEvent;

import java.util.ArrayList;
import java.util.List;

public class MagTekUsbDevice {

    public enum MagTekConnectionState { Disconnected, Connected, Connecting, Disconnecting; }

    public interface MagTekUsbConnection {
        void connectionStateChanged(MagTekConnectionState state);

        void connectionError(String errorMessage);
    }

    private final static String TAG = MagTekUsbDevice.class.getSimpleName();

    protected MagTekUsbConnection connectionListener;

    private boolean activeTransaction = false;

    protected MTSCRA cardReader;
    protected String apiKey; // this will be needed at some point

    public MagTekUsbDevice(Context context, String apiKey) {
        this.apiKey = apiKey;

        cardReader = new MTSCRA(context, new Handler(new DeviceCallbackHandler()));
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

    public static String getFirstUsbDevice(Context context) {
        String[] devices = getUsbDevices(context);
        return devices.length == 0 ? "" : devices[0];
    }

    public void setConnectionListener(MagTekUsbConnection connectionListener) {
        this.connectionListener = connectionListener;
    }

    public void startConnection(String address) {
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

    public void beginTransaction() {
        activeTransaction = true;
    }

    public void clearTransaction() {
        activeTransaction = false;
    }

    private void handleDeviceConnectionStateChanged(MTConnectionState connectionState) {
        // yeah i know the error string is just a simple static thing right now, no
        // need to have them implement the callback like this. hopefully in the future there
        // will be more info to create a meaningful error message
        switch (connectionState) {
            case Connected:
                this.connectionListener.connectionStateChanged(MagTekConnectionState.Connected);
                break;
            case Connecting:
                this.connectionListener.connectionStateChanged(MagTekConnectionState.Connecting);
                break;
            case Disconnected:
                this.connectionListener.connectionStateChanged(MagTekConnectionState.Disconnected);
                break;
            case Disconnecting:
                this.connectionListener.connectionStateChanged(MagTekConnectionState.Disconnecting);
                break;
            case Error:
            default:
                this.connectionListener.connectionError("there was an error"); // thank you, we know
                break;
        }
    }

    private class DeviceCallbackHandler implements Callback {
        @Override
        public boolean handleMessage(Message message) {
            switch (message.what) {
                case MTSCRAEvent.OnDeviceConnectionStateChanged:
                    handleDeviceConnectionStateChanged((MTConnectionState) message.obj);
                    break;
            }
            return true;
        }
    }
}
