package com.web.br.gamelogged.game.service;

import com.web.br.gamelogged.game.dto.GameDTO;

import java.util.List;
import java.util.Map;

public interface IgdbService {
    List<Map<String, Object>> fetchPaginatedGames(int limit, int offset);
    Map<String, Object> searchGameByName(String name);
    List<Map<String, Object>> searchGameListByName(String name, int limit, int offset);
    List<GameDTO> findGamesByListOfIgdbId(List<Integer> igdbIds);
}
