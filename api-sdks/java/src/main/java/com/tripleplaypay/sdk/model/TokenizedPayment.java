package com.tripleplaypay.sdk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TokenizedPayment {
    BigDecimal amount;
    String token;
    String email;
    String address1;
    String address2;
    String city;
    String state;
    String zip;
    Map<String, Object> meta;
}
