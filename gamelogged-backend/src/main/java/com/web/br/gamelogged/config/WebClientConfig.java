package com.web.br.gamelogged.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Value("${igdb.api.base-url}")
    private String igdbBaseUrl;

    @Value("${igdb.client.id}")
    private String clientId;

    @Value("${igdb.access.token}")
    private String accessToken;


    @Bean
    public WebClient webClient() {
        return WebClient.builder().baseUrl(igdbBaseUrl)
                .defaultHeader("Client-ID", clientId)
                .defaultHeader("Authorization", "Bearer " + accessToken)
                .defaultHeader("Accept", "application/json")
                .build();
    }
}
