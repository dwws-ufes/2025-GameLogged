package com.web.br.gamelogged.game.controller;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
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

}
