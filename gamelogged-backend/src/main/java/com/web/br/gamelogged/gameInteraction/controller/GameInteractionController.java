package com.web.br.gamelogged.gameInteraction.controller;

import com.web.br.gamelogged.gameInteraction.dto.UpdatePlayStatusRequest;
import com.web.br.gamelogged.gameInteraction.service.GameInteractionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<Map<String, Object>>> createGameInteraction(@RequestBody Integer gameId, @RequestBody String playStatus) {
        try {
            gameInteractionService.createGameInteraction(SecurityContextHolder.getContext().getAuthentication().getName(), gameId, playStatus);
            return ResponseEntity.ok(List.of(Map.of("message", "Game interaction salvo com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<List<Map<String, Object>>> updatePlayStatus(@RequestBody UpdatePlayStatusRequest request) {
        try {
            gameInteractionService.updatePlayStatus(SecurityContextHolder.getContext().getAuthentication().getName(), request.getGameId(), request.getPlayStatus().name());
            return ResponseEntity.ok(List.of(Map.of("message", "Play status atualizado com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

    @DeleteMapping("/delete/{gameId}")
    public ResponseEntity<List<Map<String, Object>>> deleteGameInteraction(@RequestParam Integer gameId) {
        try {
            gameInteractionService.deleteGameInteraction(SecurityContextHolder.getContext().getAuthentication().getName(), gameId);
            return ResponseEntity.ok(List.of(Map.of("message", "Game interaction deletada com sucesso")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

    @GetMapping("/status/{gameId}")
    public ResponseEntity<List<Map<String, Object>>> getPlayStatus(@PathVariable Integer gameId) {
        try {
            String playStatus = gameInteractionService.getPlayStatus(SecurityContextHolder.getContext().getAuthentication().getName(), gameId);
            return ResponseEntity.ok(List.of(Map.of("playStatus", playStatus)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(List.of(Map.of("playStatus", "NONE")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of("error", e.getMessage())));
        }
    }

}
