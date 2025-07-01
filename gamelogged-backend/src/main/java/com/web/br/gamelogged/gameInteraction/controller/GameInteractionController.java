package com.web.br.gamelogged.gameInteraction.controller;

import com.web.br.gamelogged.gameInteraction.service.GameInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/game-interaction")
public class GameInteractionController {

    private final GameInteractionService gameInteractionService;

    @Autowired
    public GameInteractionController(GameInteractionService gameInteractionService) {
        this.gameInteractionService = gameInteractionService;
    }

    @PostMapping("/create")
    public ResponseEntity<List<Map<String, Object>>> createGameInteraction(String userId, Integer gameId, String playStatus) {
        try {
            gameInteractionService.createGameInteraction(userId, gameId, playStatus);
            return ResponseEntity.ok(List.of(Map.of("message", "Game interaction salvo com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<List<Map<String, Object>>> updatePlayStatus(String userId, Integer gameId, String playStatus) {
        try {
            gameInteractionService.updatePlayStatus(userId, gameId, playStatus);
            return ResponseEntity.ok(List.of(Map.of("message", "Play status atualizado com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<List<Map<String, Object>>> deleteGameInteraction(String userId, Integer gameId) {
        try {
            gameInteractionService.deleteGameInteraction(userId, gameId);
            return ResponseEntity.ok(List.of(Map.of("message", "Game interaction deletada com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

}
