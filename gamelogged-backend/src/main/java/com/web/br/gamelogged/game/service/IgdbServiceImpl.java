package com.web.br.gamelogged.game.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class IgdbServiceImpl implements IgdbService {

    private final WebClient webClient;

    @Autowired
    public IgdbServiceImpl(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public List<Map<String, Object>> fetchPaginatedGames(int limit, int offset) {
        String body = String.format("fields id,name,cover.url; limit %d; offset %d;", limit, offset);

        return webClient.post()
                .uri("/games")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                .block();
    }
}