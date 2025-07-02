package com.web.br.gamelogged.game.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import com.web.br.gamelogged.game.dto.GameDTO;
import com.web.br.gamelogged.review.dto.GameReviewsResponseDTO;
import com.web.br.gamelogged.domain.Review;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/igdb/{name}")
    public ResponseEntity<Map<String, Object>> searchGamesByName(@PathVariable String name) {
        try {
            Map<String, Object> games = igdbService.searchGameByName(name);
            return ResponseEntity.ok().body(games);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to search games by name"));
        }
    }


    @GetMapping("/rating/{gameId}")
    public ResponseEntity<Map<String, Object>> getGameRating(@PathVariable Integer gameId) {
        Map<String, Object> response = new HashMap<>();
        response.put("averageRating", 0.0);
        response.put("ratingsCount", 0);
        try {
            response = gameService.getGameRatingInfo(gameId);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(response);
        }
    }


    @GetMapping("/igdb/search")
    public ResponseEntity<List<Map<String, Object>>> searchGameListByName(@RequestParam String name,
                                                                          @RequestParam(defaultValue = "24") int limit,
                                                                          @RequestParam(defaultValue = "0") int offset) {
        try {
            List<Map<String, Object>> games = igdbService.searchGameListByName(name, limit, offset);
            return ResponseEntity.ok(games);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(List.of(Map.of("error", "Failed to search game list by name")));
        }
    }

    @GetMapping("/find-list")
    public ResponseEntity<List<GameDTO>> findGameByListOfIgdbId(
            @RequestParam List<Integer> igdbIds) {

        List<GameDTO> games = igdbService.findGamesByListOfIgdbId(igdbIds);

        return ResponseEntity.ok(games);

    }
}
