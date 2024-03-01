package com.tripleplaypay.example;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import com.tripleplaypay.magteksdk.MagTekUsbDevice;

public class MainActivity extends AppCompatActivity {

    public Button connectButton, transactionButton;
    public TextView connectionStateText, transactionStateText;

    private void setupViews() {
        connectButton = findViewById(R.id.connect_button);
        connectionStateText = findViewById(R.id.connection_state);

        transactionButton = findViewById(R.id.transaction_button);
        transactionStateText = findViewById(R.id.transaction_state);
    }

    private void lockInput(boolean state) {
        connectButton.setEnabled(state);
        transactionButton.setEnabled(state);
    }

    private void clearViews() {
        connectButton.setText(R.string.default_text);
        transactionButton.setEnabled(false);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        setupViews();

        MagTekUsbDevice device = new MagTekUsbDevice(this, "testapikey");

        device.setOnConnecting(isConnected -> {
            if (isConnected) {
                lockInput(false);
                connectionStateText.setText("Connected to device");
            } else {
                lockInput(true);
                connectionStateText.setText("Connecting...");
            }
        });

        connectButton.setOnClickListener(view -> {
            if (! device.startUsbConnection()) {
                connectionStateText.setText("No USB devices found");
            }
        });
    }
}