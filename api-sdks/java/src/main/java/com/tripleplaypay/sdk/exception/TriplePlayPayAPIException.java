package com.tripleplaypay.sdk.exception;

import lombok.Getter;
import org.springframework.web.client.RestClientResponseException;

@Getter
public class TriplePlayPayAPIException extends RuntimeException {
    RestClientResponseException httpException;

    public TriplePlayPayAPIException(Exception e) {
        super(e);
        if (e instanceof RestClientResponseException) {
            httpException = (RestClientResponseException) e;
        }
    }

    public String getBody() {
        if (httpException == null)
            return null;
        return httpException.getResponseBodyAsString();
    }
}
