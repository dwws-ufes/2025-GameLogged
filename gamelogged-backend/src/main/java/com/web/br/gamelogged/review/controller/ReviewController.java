package com.web.br.gamelogged.review.controller;

import com.web.br.gamelogged.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Map<String, Object>> createReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours) {
        try {
            reviewService.createReview(userId, gameId, reviewText, rating, platform, playTimeInHours);
            return ResponseEntity.ok(Map.of("message", "Review criada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours) {
        try {
            System.out.println("Updating review for user: " + userId + ", gameId: " + gameId + ", reviewText: " + reviewText + ", rating: " + rating + ", platform: " + platform + ", playTimeInHours: " + playTimeInHours);
            reviewService.updateReview(userId, gameId, reviewText, rating, platform, playTimeInHours);
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
