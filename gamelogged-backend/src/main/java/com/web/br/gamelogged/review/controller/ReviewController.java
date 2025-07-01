package com.web.br.gamelogged.review.controller;

import com.web.br.gamelogged.review.dto.CreateReviewRequest;
import com.web.br.gamelogged.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.Map;

@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createReview(@RequestBody CreateReviewRequest request) {
        try {
            reviewService.createReview(SecurityContextHolder.getContext().getAuthentication().getName(), request.getGameId(), request.getReviewText(), request.getRating(), request.getPlatform(), request.getPlayTimeInHours(), request.getPlayStatus());
            return ResponseEntity.ok(Map.of("message", "Review criada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateReview(@RequestBody CreateReviewRequest request) {
        try {
            reviewService.updateReview(SecurityContextHolder.getContext().getAuthentication().getName(), request.getGameId(), request.getReviewText(), request.getRating(), request.getPlatform(), request.getPlayTimeInHours());
            return ResponseEntity.ok(Map.of("message", "Review atualizada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteReview(String userId, Integer gameId) {
        try {
            reviewService.deleteReview(userId, gameId);
            return ResponseEntity.ok(Map.of("message", "Review deletada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
