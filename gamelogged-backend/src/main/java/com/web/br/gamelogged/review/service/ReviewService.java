package com.web.br.gamelogged.review.service;

public interface ReviewService {
    void createReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours);
    void updateReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours);
    void deleteReview(String userId, Integer gameId);
}
