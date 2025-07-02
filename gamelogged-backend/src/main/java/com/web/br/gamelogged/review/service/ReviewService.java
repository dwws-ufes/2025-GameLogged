package com.web.br.gamelogged.review.service;

import com.web.br.gamelogged.domain.PlayStatus;
import com.web.br.gamelogged.review.dto.GameReviewsResponseDTO;

import java.sql.Time;
import java.util.Map;

public interface ReviewService {
    void createReview(String userId, Integer gameId, String reviewText, double rating, String platform, Time playTimeInHours, PlayStatus playStatus);
    void updateReview(String userId, Integer gameId, String reviewText, double rating, String platform, Time playTimeInHours);
    void deleteReview(String userId, Integer gameId);
    GameReviewsResponseDTO getGameReviews(Integer gameId, String userId);
}
