package tpp.sdk.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import tpp.sdk.autoconfigure.TriplePlaySdkAutoConfiguration.TriplePlaySdkProperties;

@Component
public class TriplePlayClient {
    final WebClient webClient;

    public TriplePlayClient(
            TriplePlaySdkProperties properties,
            WebClient.Builder builder
    ) {

        webClient = builder
                .baseUrl(properties.getBaseUrl())
                .filter(ExchangeFilterFunction.ofRequestProcessor(
                        r -> Mono.just(ClientRequest.from(r)
                                .headers(s -> s.setBearerAuth(properties.getBearerToken()))
                                .build())
                ))
                .build();

    }
}
