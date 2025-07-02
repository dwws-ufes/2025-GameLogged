package com.web.br.gamelogged.gameInteraction.service;

import com.web.br.gamelogged.domain.GameInteraction;

import java.util.List;

public interface GameInteractionService {
    GameInteraction createGameInteraction(String userId, Integer gameId, String playStatus);
    void updatePlayStatus(String userId, Integer gameId, String playStatus);
    void deleteGameInteraction(String userId, Integer gameId);
    String getPlayStatus(String userId, Integer gameId);
    List<GameInteraction> findByGameIgdbId(Integer igdbId);
}

