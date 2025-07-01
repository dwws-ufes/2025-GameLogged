package com.web.br.gamelogged.game.service;

import java.util.List;
import java.util.Map;

public interface IgdbService {
    List<Map<String, Object>> fetchPaginatedGames(int limit, int offset);
    Map<String, Object> searchGameByName(String name);
}
