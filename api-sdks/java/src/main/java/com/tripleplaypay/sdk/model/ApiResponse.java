package com.tripleplaypay.sdk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiResponse<T> {
    @JsonProperty("request_id")
    UUID requestId;
    Boolean status;
    String method;
    T message;
}
