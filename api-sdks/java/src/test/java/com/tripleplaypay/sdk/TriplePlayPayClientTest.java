package com.tripleplaypay.sdk;

import com.tripleplaypay.sdk.model.ApiResponse;
import com.tripleplaypay.sdk.model.ProcessedTransaction;
import com.tripleplaypay.sdk.model.TokenizedPayment;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class TriplePlayPayClientTest {

    @Disabled("show usage only - comment this line and add your key to test")
    @Test
    void showUsage() {
        String apiKey = "";
        String token = "";

        TriplePlayPayClient triplePlayPayClient = new TriplePlayPayClient(apiKey);

        ResponseEntity<ApiResponse<ProcessedTransaction>> response = triplePlayPayClient.makeTokenizedPaymentCharge(new TokenizedPayment()
                .setToken(token)
                .setAmount(new BigDecimal("1.49")));

        System.out.println(response);
        System.out.println(response.getBody());
        System.out.println(response.getBody().getRequestId());
        System.out.println(response.getBody().getMessage().getTransactionId());


        UUID transactionId = response.getBody().getMessage().getTransactionId();

        ResponseEntity<ApiResponse<ProcessedTransaction>> voidResponse = triplePlayPayClient.voidTransaction(transactionId);

        System.out.println(voidResponse);

        response = triplePlayPayClient.authorizeTransaction(new TokenizedPayment()
                .setToken(token)
                .setAmount(new BigDecimal("1.39")));

        System.out.println(response);
        System.out.println(response.getBody().getMessage().getTransactionId());

        transactionId = response.getBody().getMessage().getTransactionId();

        ResponseEntity<ApiResponse<ProcessedTransaction>> captureResponse = triplePlayPayClient.captureTransaction(transactionId, new BigDecimal("1.45"));
        System.out.println(captureResponse);

        ResponseEntity<ApiResponse<ProcessedTransaction>> refundResponse = triplePlayPayClient.refundTransaction(captureResponse.getBody().getMessage().getTransactionId(), null);
        System.out.println(refundResponse);
    }

}
