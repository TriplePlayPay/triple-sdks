package com.tripleplaypay.magteksdk;

import android.os.Message;
import android.os.Handler;
import android.os.Handler.Callback;

import androidx.appcompat.app.AppCompatActivity;

import com.magtek.mobile.android.mtlib.MTSCRA;
import com.magtek.mobile.android.mtlib.MTSCRAEvent;

public class MagTekController {

    protected String apiKey; // this will be needed at some point
    private MTSCRA device;

    public MagTekController(AppCompatActivity context, String apiKey) {
        this.apiKey = apiKey;

        device = new MTSCRA(context, new Handler(new DeviceCallbackHandler()));
    }

    private class DeviceCallbackHandler implements Callback {
        @Override
        public boolean handleMessage(Message message) {
            // TODO
            return true;
        }
    }

}
