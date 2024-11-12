package com.tripleplaypay.sdk;

import com.tripleplaypay.sdk.exception.TriplePlayPayAPIException;
import com.tripleplaypay.sdk.model.ApiResponse;
import com.tripleplaypay.sdk.model.ProcessedTransaction;
import com.tripleplaypay.sdk.model.TokenizedPayment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Slf4j
public class TriplePlayPayClient {
    private final String token;
    private final RestTemplate restTemplate;

    public TriplePlayPayClient(String token) {
        this(token, false);
    }

    public TriplePlayPayClient(String token, boolean sandbox) {
        this(token, sandbox ? "https://sandbox.tripleplaypay.com" : "https://tripleplaypay.com");
    }

    public TriplePlayPayClient(String token, String url) {
        this.token = token;
        restTemplate = new RestTemplateBuilder()
                .rootUri(url)
                .defaultHeader(HttpHeaders.AUTHORIZATION, this.token)
                .errorHandler(new ApiErrorHandler())
                .build();
    }

    public ResponseEntity<ApiResponse<ProcessedTransaction>> voidTransaction(UUID transactionId) {
        // POST to /api/void
        return restTemplate.exchange(
                RequestEntity
                        .post("/api/void")
                        .body(Map.of("id", transactionId)),
                new ParameterizedTypeReference<>() {
                });
    }

    public ResponseEntity<ApiResponse<ProcessedTransaction>> refundTransaction(UUID transactionId, @Nullable BigDecimal amount) {
        Map<String, ?> requestBody = amount != null
                ? Map.of("id", transactionId, "amount", amount)
                : Map.of("id", transactionId);

        return restTemplate.exchange(
                RequestEntity
                        .post("/api/refund")
                        .body(requestBody),
                new ParameterizedTypeReference<>() {
                });
    }

    public ResponseEntity<ApiResponse<ProcessedTransaction>> makeTokenizedPaymentCharge(TokenizedPayment tokenizedPayment) {
        return restTemplate.exchange(
                RequestEntity
                        .post("/api/charge")
                        .body(tokenizedPayment),
                new ParameterizedTypeReference<>() {
                });
    }

    /**
     * {@link ProcessedTransaction#getTransactionId()} - this is the id to capture in {@link #captureTransaction(UUID, BigDecimal)}
     */
    public ResponseEntity<ApiResponse<ProcessedTransaction>> authorizeTransaction(TokenizedPayment tokenizedPayment) {
        // POST to /api/authorize
        return restTemplate.exchange(
                RequestEntity
                        .post("/api/authorize")
                        .body(tokenizedPayment),
                new ParameterizedTypeReference<>() {
                });
    }

    public ResponseEntity<ApiResponse<ProcessedTransaction>> captureTransaction(UUID transactionId, @Nullable BigDecimal amount) {
        // POST to /api/capture (formerly /api/settle)
        Map<String, ?> requestBody = amount != null
                ? Map.of("id", transactionId, "amount", amount)
                : Map.of("id", transactionId);

        return restTemplate.exchange(
                RequestEntity
                        .post("/api/settle")
                        .body(requestBody),
                new ParameterizedTypeReference<>() {
                });
    }

    public static class ApiErrorHandler extends DefaultResponseErrorHandler {
        @Override
        public void handleError(ClientHttpResponse response) {
            try {
                super.handleError(response);
            } catch (IOException e) {
                throw new TriplePlayPayAPIException(e);
            }
        }

        @Override
        protected void handleError(ClientHttpResponse response, HttpStatus statusCode) {
            try {
                super.handleError(response, statusCode);
            } catch (IOException e) {
                throw new TriplePlayPayAPIException(e);
            }
        }
    }
}
