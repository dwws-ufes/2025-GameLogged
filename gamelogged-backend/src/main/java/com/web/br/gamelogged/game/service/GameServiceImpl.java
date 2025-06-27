package com.web.br.gamelogged.game.service;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.game.repository.GameRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    private GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
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

    @Override
    @Transactional
    public void updateGameAverageRating(Integer igdbId, Double newRating) {
        Game game = gameRepository.findByIgdbId(igdbId).orElseThrow(() -> new RuntimeException("Game not found"));

        Double currentAverage = game.getAverageRating();
        Integer currentTotalRatings = game.getTotalUserRatings();

        if (currentAverage == null) {
            currentAverage = 0.0;
        }
        if (currentTotalRatings == null) {
            currentTotalRatings = 0;
        }

        Double updatedAverage = ((currentAverage * currentTotalRatings) + newRating) / (currentTotalRatings + 1);
        game.setAverageRating(updatedAverage);
        game.setTotalUserRatings(currentTotalRatings + 1);
        gameRepository.save(game);
    }

    @Override
    public Game findGameByIgdbId(Integer igdbId) {
        return gameRepository.findByIgdbId(igdbId).orElse(null);
    }
}
