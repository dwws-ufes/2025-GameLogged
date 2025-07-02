package com.web.br.gamelogged.game.service;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.domain.Review;
import com.web.br.gamelogged.game.repository.GameRepository;
import com.web.br.gamelogged.gameInteraction.repository.GameInteractionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final GameInteractionRepository gameInteractionRepository;

    public GameServiceImpl(GameRepository gameRepository, GameInteractionRepository gameInteractionRepository) {
        this.gameRepository = gameRepository;
        this.gameInteractionRepository = gameInteractionRepository;
    }

    @Override
    @Transactional
    public void createGame(Integer igdbId) {
        Game newGame = new Game();
        newGame.setIgdbId(igdbId);
        newGame.setAverageRating(0.0);
        newGame.setTotalUserRatings(0);

        gameRepository.save(newGame);
    }

    @Transactional
    public void addRatingToGame(Integer igdbId, Double newRating) {
        Game game = gameRepository.findByIgdbId(igdbId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with IGDB ID: " + igdbId));

        double currentAverage = game.getAverageRating();
        int currentTotal = game.getTotalUserRatings();

        double newSum = (currentAverage * currentTotal) + newRating;
        int newTotal = currentTotal + 1;

        game.setAverageRating(newSum / newTotal);
        game.setTotalUserRatings(newTotal);

        gameRepository.save(game);
    }

    @Override
    @Transactional
    public void updateGameRating(Integer igdbId, Double oldRating, Double newRating) {
        if (oldRating.equals(newRating)) {
            return;
        }

        Game game = gameRepository.findByIgdbId(igdbId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with IGDB ID: " + igdbId));

        int totalRatings = game.getTotalUserRatings();

        if (totalRatings <= 0) {
            throw new IllegalStateException("Cannot update rating for a game with no ratings.");
        }

        double currentAverage = game.getAverageRating();
        double currentSum = currentAverage * totalRatings;
        double newSum = currentSum - oldRating + newRating;
        game.setAverageRating(newSum / totalRatings);

        gameRepository.save(game);
    }

    @Override
    @Transactional
    public void removeRatingFromGame(Integer igdbId, Double ratingToRemove) {
        Game game = gameRepository.findByIgdbId(igdbId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with IGDB ID: " + igdbId));

        double currentAverage = game.getAverageRating();
        int currentTotal = game.getTotalUserRatings();

        if (currentTotal <= 0) {
            throw new IllegalStateException("Cannot remove rating from a game with no ratings.");
        }

        double currentSum = currentAverage * currentTotal;
        double newSum = currentSum - ratingToRemove;
        int newTotal = currentTotal - 1;

        game.setAverageRating(newSum / newTotal);
        game.setTotalUserRatings(newTotal);

        gameRepository.save(game);
    }

    @Override
    public Game findGameByIgdbId(Integer igdbId) {
        return gameRepository.findByIgdbId(igdbId).orElse(null);
    }

    @Override
    public Game findOrCreateGameByIgdbId(Integer igdbId) {
        return gameRepository.findByIgdbId(igdbId)
                .orElseGet(() -> {
                    Game newGame = new Game();
                    newGame.setIgdbId(igdbId);
                    newGame.setAverageRating(0.0);
                    newGame.setTotalUserRatings(0);
                    return gameRepository.save(newGame);
                });
    }

    public Double getGameRating(Integer igdbId) {
        Game game = gameRepository.findByIgdbId(igdbId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with IGDB ID: " + igdbId));
        return game.getAverageRating();
    }

    @Override
    public Map<String, Object> getGameRatingInfo(Integer igdbId) {

        Game game = gameRepository.findByIgdbId(igdbId).orElse(null);
        if (game == null) {
            throw new EntityNotFoundException("Game not found with IGDB ID: " + igdbId);
        }

        List<GameInteraction> interactions = gameInteractionRepository.findByGameIgdbId(igdbId);
        List<Review> reviews = interactions.stream()
                .map(GameInteraction::getReview)
                .filter(Objects::nonNull)
                .toList();

        Map<Double, Long> ratingsCount = reviews.stream()
                .collect(Collectors.groupingBy(Review::getRating, Collectors.counting()));

        Map<String, Object> response = new HashMap<>();
        response.put("averageRating", game.getAverageRating());
        response.put("ratingsCount", ratingsCount);

        return response;
    }
}
