package com.tripleplaypay.example;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import com.tripleplaypay.magteksdk.MagTekUsbDevice;
import com.tripleplaypay.magteksdk.MagTekUsbDevice.MagTekUsbConnection;
import com.tripleplaypay.magteksdk.MagTekUsbDevice.MagTekConnectionState;

public class MainActivity extends AppCompatActivity {

    public Button testConnectionButton;
    public TextView connectionStateText;

    private void setupViews() {
        testConnectionButton = findViewById(R.id.test_button);
        connectionStateText = findViewById(R.id.text);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        setupViews();

        MagTekUsbDevice device = new MagTekUsbDevice(this, "testapikey");

        device.setConnectionListener(new MagTekUsbConnection() {
            @Override
            public void connectionStateChanged(MagTekConnectionState connectionState) {
                connectionStateText.setText(connectionState.name());
            }

            @Override
            public void connectionError(String errorMessage) {
                // should ask the user to try again or something
                connectionStateText.setText(errorMessage);
            }
        });

        testConnectionButton.setOnClickListener(view -> {
            String usbDevice = MagTekUsbDevice.getFirstUsbDevice(this);
            if (usbDevice != null)
                device.startConnection(usbDevice);
        });
    }
}