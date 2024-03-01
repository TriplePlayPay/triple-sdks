package com.tripleplaypay.example;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.tripleplaypay.magteksdk.MagTekUsbDevice;

public class MainActivity extends AppCompatActivity {

    public Button connectButton, transactionButton;
    public TextView connectionStateText, transactionStateText, messageText;

    MagTekUsbDevice cardReader;

    // some super basic UI logic
    // everything is easier with callbacks
    private void setupViews() {
        connectButton = findViewById(R.id.connect_button);
        connectionStateText = findViewById(R.id.connection_state);

        transactionButton = findViewById(R.id.transaction_button);
        transactionStateText = findViewById(R.id.transaction_state);

        resetViews();
    }

    private void resetViews() {
        transactionButton.setEnabled(false);
        transactionButton.setOnClickListener(view -> {
            messageText.setText(cardReader.beginTransaction("100"));
        });

        connectButton.setText(R.string.disconnected_button);
        connectButton.setOnClickListener(this::connect);
    }

    private void setInputClickable(boolean state) {
        connectButton.setEnabled(state);
        transactionButton.setEnabled(state);
    }

    void connect(View view) { // this is a callback for a button's onClick method

        /*
            If you would rather handle the details of USB connections, pass
            the address of the USB device to the function
            `device.startUsbConnectionWithAddress(<USB address>)`

            You can get a list of valid MagTek addresses with by calling
            `MagTekUsbDevice.getUsbDevices(this)` or by using the Android API
            with `getSystemService(Context.USB_SERVICE)`. each MagTek device
            will have the vendor ID 0x801. The address for a usbDevice can
            be retrieved from `usbDevice.getDeviceName()`
        */

        // example:
        //  String[] devices = MagTekUsbDevice.getUsbDevices(this);
        //  if (devices.length > 0)
        //      cardReader.startUsbConnectionWithAddress(devices[0]);

        // otherwise, it will be done automatically
        if (! cardReader.startUsbConnection(this)) {
            connectionStateText.setText("No USB devices found");
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        setupViews();

        cardReader = new MagTekUsbDevice(this, "testapikey");

        cardReader.setOnConnecting(isConnected -> {
            setInputClickable(isConnected);
            if (isConnected) {
                connectButton.setText("Disconnect from device");
                // update button logic to disconnect instead
                connectButton.setOnClickListener(view -> cardReader.closeConnection());
                connectionStateText.setText("Connected");
            } else {
                connectButton.setText("...");
                connectionStateText.setText("Connecting...");
            }
        });

        cardReader.setOnDisconnecting(isDisconnected -> {
            // no need to implement this if you never intend on
            // disconnecting from the device
            setInputClickable(isDisconnected);
            if (isDisconnected) {
                resetViews();
                connectionStateText.setText("Disconnected");
            } else {
                connectButton.setText("...");
                connectionStateText.setText("Disconnecting...");
            }
        });
    }
}