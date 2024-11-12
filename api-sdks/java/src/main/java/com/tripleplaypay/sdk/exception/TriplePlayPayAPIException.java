package com.tripleplaypay.sdk.exception;

import java.io.IOException;

public class TriplePlayPayAPIException extends RuntimeException {
    public TriplePlayPayAPIException(IOException e) {
        super(e);
    }
}
