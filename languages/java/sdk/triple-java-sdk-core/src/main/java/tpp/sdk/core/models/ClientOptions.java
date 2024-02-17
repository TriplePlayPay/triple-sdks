package tpp.sdk.core.models;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ClientOptions {
    String baseUrl;
    String bearerToken;
}
