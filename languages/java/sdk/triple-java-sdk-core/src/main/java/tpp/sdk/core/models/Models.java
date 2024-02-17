package tpp.sdk.core.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Map;

public interface Models {
    @Data
    @Accessors(chain = true)
    @Dto
    class ApiResponse<T> {
        String id;
        String status;
        String method;
        T message;
    }

    @Data
    @Accessors(chain = true)
    @Dto
    class BankAccount {
        @NotNull
        @JsonProperty("routing_number")
        String routingNumber;
        @NotNull
        @JsonProperty("account_number")
        String accountNumber;
        String email;
    }

    @Data
    @Accessors(chain = true)
    @Dto
    abstract class Charge {
        @NotNull
        BigDecimal amount;
        String email;
        Map<String, Object> meta;
        String address1;
        String address2;
        String city;
        String state;
        String zip;
        BigDecimal tip;

        @EqualsAndHashCode(callSuper = true)
        @Data
        @Accessors(chain = true)
        @Dto
        public static class CardCharge extends Charge {
            @NotNull
            String cc;
            @NotNull
            String mm;
            @NotNull
            String yy;
            String cvv;
        }

        @EqualsAndHashCode(callSuper = true)
        @Data
        @Accessors(chain = true)
        @Dto
        public static class BankCharge extends Charge {
            @NotNull
            @JsonProperty("routing_number")
            String routingNumber;
            @NotNull
            @JsonProperty("account_number")
            String accountNumber;
            Type type;

            public enum Type {
                checking,
                savings,
            }
        }

        @EqualsAndHashCode(callSuper = true)
        @Data
        @Accessors(chain = true)
        @Dto
        public static class TerminalCharge extends Charge {
            @NotNull
            String laneId;
            BigDecimal surcharge;
        }

        @EqualsAndHashCode(callSuper = true)
        @Data
        @Accessors(chain = true)
        @Dto
        public static class TokenCharge extends Charge {
            @NotNull
            String token;
            BigDecimal surcharge;
        }
    }

    @Data
    @Accessors(chain = true)
    @Dto
    class CreditCard {
        @NotNull
        String cc;
        String cvv;
        @NotNull
        String mm;
        @NotNull
        String yy;
        String email;
    }

    @Data
    @Accessors(chain = true)
    @Dto
    class Refund {
        @NotNull
        String id;
    }
}
