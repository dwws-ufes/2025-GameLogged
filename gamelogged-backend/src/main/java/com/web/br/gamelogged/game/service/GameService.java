package com.web.br.gamelogged.game.service;

import com.web.br.gamelogged.domain.Game;

public interface GameService {
    void createGame(Integer igdbId);

    void updateGameAverageRating(Integer igdbId, Double newRating);

    Game findGameByIgdbId(Integer igdbId);
}
