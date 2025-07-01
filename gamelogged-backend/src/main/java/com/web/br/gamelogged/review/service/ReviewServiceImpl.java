package com.web.br.gamelogged.review.service;

import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.domain.PlatformType;
import com.web.br.gamelogged.domain.PlayStatus;
import com.web.br.gamelogged.domain.Review;
import com.web.br.gamelogged.game.service.GameService;
import com.web.br.gamelogged.gameInteraction.repository.GameInteractionRepository;
import com.web.br.gamelogged.gameInteraction.service.GameInteractionService;
import com.web.br.gamelogged.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final GameInteractionRepository gameInteractionRepository;
    private final ReviewRepository reviewRepository;
    private final GameService gameService;
    private final GameInteractionService gameInteractionService;

    @Autowired
    public ReviewServiceImpl(GameInteractionRepository gameInteractionRepository, ReviewRepository reviewRepository, GameService gameService, GameInteractionService gameInteractionService) {
        this.gameInteractionRepository = gameInteractionRepository;
        this.reviewRepository = reviewRepository;
        this.gameService = gameService;
        this.gameInteractionService = gameInteractionService;
    }

    @Override
    @Transactional
    public void createReview(String userId, Integer gameId, String reviewText, double rating, String platform, Time playTimeInHours, PlayStatus playStatus) {
        Optional<GameInteraction> interaction = findGameInteraction(userId, gameId);
        GameInteraction gameInteraction;
        gameInteraction = interaction.orElseGet(() -> gameInteractionService.createGameInteraction(userId, gameId, playStatus.name()));


        if (gameInteraction.getReview() != null) {
            throw new IllegalStateException("Usuário já possui uma review para este jogo");
        }

        Review newReview = new Review();
        newReview.setDescription(reviewText);
        newReview.setRating(rating);
        newReview.setPlatformType(platform);
        newReview.setCreationDate(LocalDateTime.now());
        newReview.setPlayTimeInHours(playTimeInHours);
        gameInteraction.setReview(newReview);
        newReview.setGameInteraction(gameInteraction);
        gameInteractionRepository.save(gameInteraction);
        gameService.addRatingToGame(gameId, rating);

    }

    @Override
    @Transactional
    public void updateReview(String userId, Integer gameId, String reviewText, double rating, String platform, Time playTimeInHours) {
        Optional<GameInteraction> interaction = findGameInteraction(userId, gameId);

        if (interaction.isEmpty()) {
            throw new IllegalStateException("Interação de jogo não encontrada para o usuário: " + userId + " e jogo: " + gameId);
        }

        GameInteraction gameInteraction = interaction.get();

        if (gameInteraction.getReview() == null) {
            throw new IllegalStateException("Usuário não possui uma review para este jogo");
        }

        double oldRating = gameInteraction.getReview().getRating();

        Review existingReview = gameInteraction.getReview();
        existingReview.setDescription(reviewText);
        existingReview.setRating(rating);
        existingReview.setPlatformType(platform);
        existingReview.setCreationDate(LocalDateTime.now());
        existingReview.setPlayTimeInHours(playTimeInHours);

        gameInteractionRepository.save(gameInteraction);

        gameService.updateGameRating(gameId, oldRating, rating);

    }

    @Override
    @Transactional
    public void deleteReview(String userId, Integer gameId) {
        Optional<GameInteraction> interaction = findGameInteraction(userId, gameId);

        if (interaction.isEmpty()) {
            throw new IllegalStateException("Interação de jogo não encontrada para o usuário: " + userId + " e jogo: " + gameId);
        }

        GameInteraction gameInteraction = interaction.get();

        if (gameInteraction.getReview() == null) {
            throw new IllegalStateException("Usuário não possui uma review para este jogo");
        }

        double ratingToRemove = gameInteraction.getReview().getRating();

        gameInteraction.setReview(null);
        gameInteractionRepository.save(gameInteraction);
        gameService.removeRatingFromGame(gameId, ratingToRemove);
    }

    private Optional<GameInteraction> findGameInteraction(String userId, Integer gameId) {
        return gameInteractionRepository.findByUserUuidAndGameIgdbId(userId, gameId);
    }
}
