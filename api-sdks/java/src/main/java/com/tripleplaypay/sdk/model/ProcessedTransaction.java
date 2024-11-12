package com.tripleplaypay.sdk.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Data
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProcessedTransaction {
    @JsonIgnore
    @JsonAnyGetter
    @JsonAnySetter
    Map<String, Object> additionalProperties;

    @JsonProperty("platform_fee")
    String platformFee;

    /**
     * hash of the transaction parameters
     */
    String hashed;

    @JsonProperty("convenience_fee")
    BigDecimal convenienceFee;

    BigDecimal amount;

    @JsonProperty("initial_amount")
    BigDecimal initialAmount;

    BigDecimal surcharge;

    /**
     * details as received from upstream processor
     */
    Map<String, Object> details;

    /**
     * e.g. {@code APPROVED}
     */
    String message;

    BigDecimal tip;

    /**
     * e.g. {@code cc}
     */
    String method;

    @JsonProperty("transaction_id")
    UUID transactionId;

    /**
     * provided in responses for voids and refunds
     */
    @JsonProperty("original_transaction_id")
    UUID originalTransactionId;

    BigDecimal fee;

    String ip;

    /**
     * token representing payment method that was used
     */
    String token;

    Map<String, Object> meta;
}
