package tpp.sdk.autoconfigure;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import tpp.sdk.core.models.ClientOptions;

@AutoConfiguration
@Import(TriplePlaySdkAutoConfiguration.ConfigureTppSdk.class)
@EnableConfigurationProperties(TriplePlaySdkAutoConfiguration.TriplePlaySdkProperties.class)
public class TriplePlaySdkAutoConfiguration {

    @ToString(callSuper = true)
    @EqualsAndHashCode(callSuper = true)
    @Data
    @Accessors(chain = true)
    @ConfigurationProperties(prefix = "triple-play.sdk")
    public static class TriplePlaySdkProperties extends ClientOptions {
        boolean enabled = true;
    }

    @ConditionalOnProperty(prefix = "triple-play.sdk", name = "enabled", matchIfMissing = true)
    @ComponentScan("tpp.sdk.client")
    static class ConfigureTppSdk {
    }

}
