package com.web.br.gamelogged.game.service;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.game.dto.GameDTO;

import java.util.List;

import java.util.Map;

public interface GameService {
    void createGame(Integer igdbId);

    void addRatingToGame(Integer igdbId, Double newRating);

    void updateGameRating(Integer igdbId, Double oldRating, Double newRating);

    void removeRatingFromGame(Integer igdbId, Double ratingToRemove);

    Game findGameByIgdbId(Integer igdbId);

    Game findOrCreateGameByIgdbId(Integer igdbId);

    Map<String, Object> getGameRatingInfo(Integer igdbId);
}
