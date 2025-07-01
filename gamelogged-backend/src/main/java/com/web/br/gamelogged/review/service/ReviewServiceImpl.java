package com.web.br.gamelogged.review.service;

import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.domain.PlatformType;
import com.web.br.gamelogged.domain.Review;
import com.web.br.gamelogged.game.service.GameService;
import com.web.br.gamelogged.gameInteraction.repository.GameInteractionRepository;
import com.web.br.gamelogged.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final GameInteractionRepository gameInteractionRepository;
    private final ReviewRepository reviewRepository;
    private final GameService gameService;

    @Autowired
    public ReviewServiceImpl(GameInteractionRepository gameInteractionRepository, ReviewRepository reviewRepository, GameService gameService) {
        this.gameInteractionRepository = gameInteractionRepository;
        this.reviewRepository = reviewRepository;
        this.gameService = gameService;
    }

    @Override
    @Transactional
    public void createReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours) {
        GameInteraction interaction = findGameInteraction(userId, gameId);

        if (interaction.getReview() != null) {
            throw new IllegalStateException("Usuário já possui uma review para este jogo");
        }

        Review newReview = new Review();
        newReview.setDescription(reviewText);
        newReview.setRating(rating);
        newReview.setPlatformType(PlatformType.valueOf(platform));
        newReview.setCreationDate(LocalDateTime.now());
        newReview.setPlayTimeInHours(playTimeInHours);
        interaction.setReview(newReview);
        newReview.setGameInteraction(interaction);

        gameInteractionRepository.save(interaction);

        gameService.updateGameAverageRating(gameId, rating);

    }

    @Override
    @Transactional
    public void updateReview(String userId, Integer gameId, String reviewText, double rating, String platform, Double playTimeInHours) {
        GameInteraction interaction = findGameInteraction(userId, gameId);

        if (interaction.getReview() == null) {
            throw new IllegalStateException("Usuário não possui uma review para este jogo");
        }

        Review existingReview = interaction.getReview();
        existingReview.setDescription(reviewText);
        existingReview.setRating(rating);
        existingReview.setPlatformType(platform == null ? null : PlatformType.valueOf(platform));
        existingReview.setCreationDate(LocalDateTime.now());
        existingReview.setPlayTimeInHours(playTimeInHours);

        gameInteractionRepository.save(interaction);
    }

    @Override
    @Transactional
    public void deleteReview(String userId, Integer gameId) {
        GameInteraction interaction = findGameInteraction(userId, gameId);

        if (interaction.getReview() == null) {
            throw new IllegalStateException("Usuário não possui uma review para este jogo");
        }

        interaction.setReview(null);
        gameInteractionRepository.save(interaction);

        gameService.updateGameAverageRating(gameId, 0.0);
    }

    private GameInteraction findGameInteraction(String userId, Integer gameId) {
        return gameInteractionRepository.findByUserUuidAndGameIgdbId(userId, gameId)
                .orElseThrow(() -> new IllegalStateException("Usuário não possui interação com o jogo"));
    }
}
