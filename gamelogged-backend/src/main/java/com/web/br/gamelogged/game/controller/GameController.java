package com.web.br.gamelogged.game.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.game.service.GameService;
import com.web.br.gamelogged.game.service.IgdbService;

@RestController
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;
    private final IgdbService igdbService;

    @Autowired
    public GameController(GameService gameService, IgdbService igdbService) {
        this.gameService = gameService;
        this.igdbService = igdbService;
    }

    @GetMapping("/find")
    public ResponseEntity<Map<String, Object>> findGameByIgdbId(Integer igdbId) {
        Game game = gameService.findGameByIgdbId(igdbId);
        if (game == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Game not found"));
        }
        return ResponseEntity.ok(Map.of(
                "igdbId", game.getIgdbId(),
                "averageRating", game.getAverageRating(),
                "totalUserRatings", game.getTotalUserRatings()
        ));
    }

    @GetMapping("/igdb/paginated")
    public ResponseEntity<List<Map<String, Object>>> getPaginatedGames(
            @RequestParam(defaultValue = "24") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        try {
            List<Map<String, Object>> games = igdbService.fetchPaginatedGames(limit, offset);
            return ResponseEntity.ok(games);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(List.of(Map.of("error", "Failed to fetch games from IGDB")));
        }
    }
}
