package org.example.tpp.sdk.boot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tpp.sdk.client.TriplePlayClient;

@SpringBootApplication
class SpringBootExampleApp {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootExampleApp.class, args);
    }

    @Autowired
    TriplePlayClient triplePlayClient;

    @Bean
    ApplicationRunner applicationRunner() {
        return this::applicationRunner;
    }

    void applicationRunner(ApplicationArguments args) {
        System.out.println(triplePlayClient.getClass().getSimpleName());
    }
}
