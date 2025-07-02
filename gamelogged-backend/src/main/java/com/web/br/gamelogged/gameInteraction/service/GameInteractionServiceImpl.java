package com.web.br.gamelogged.gameInteraction.service;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.domain.PlayStatus;
import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.game.service.GameService;
import com.web.br.gamelogged.gameInteraction.repository.GameInteractionRepository;
import com.web.br.gamelogged.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameInteractionServiceImpl implements GameInteractionService {

    private final GameInteractionRepository gameInteractionRepository;
    private final UserRepository userRepository;

    private final GameService gameService;

    @Autowired
    public GameInteractionServiceImpl(GameInteractionRepository gameInteractionRepository, UserRepository userRepository, GameService gameService) {
        this.gameInteractionRepository = gameInteractionRepository;
        this.userRepository = userRepository;
        this.gameService = gameService;
    }

    @Override
    @Transactional
    public GameInteraction createGameInteraction(String userId, Integer gameId, String playStatus) {
        if (gameInteractionRepository.findByUserUuidAndGameIgdbId(userId, gameId).isPresent()) {
            throw new IllegalArgumentException("Interação de jogo já existe para o usuário: " + userId + " e jogo: " + gameId);
        }

        GameInteraction gameInteraction = new GameInteraction();
        User user = userRepository.findByUuid(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com UUID: " + userId));

        Game game = gameService.findOrCreateGameByIgdbId(gameId);

        gameInteraction.setUser(user);
        gameInteraction.setGame(game);
        gameInteraction.setPlayStatus(PlayStatus.valueOf(playStatus.toUpperCase()));

        return gameInteractionRepository.save(gameInteraction);
    }

    @Override
    @Transactional
    public void updatePlayStatus(String userId, Integer gameId, String playStatus) {

        if (gameInteractionRepository.findByUserUuidAndGameIgdbId(userId, gameId).isEmpty()) {
            this.createGameInteraction(userId, gameId, playStatus);
            return;
        }

        GameInteraction existingInteraction = gameInteractionRepository
                .findByUserUuidAndGameIgdbId(userId, gameId)
                .orElseThrow(() -> new EntityNotFoundException("Interação de jogo não encontrada para o usuário: " + userId + " e jogo: " + gameId));

        existingInteraction.setPlayStatus(PlayStatus.valueOf(playStatus.toUpperCase()));

        gameInteractionRepository.save(existingInteraction);
    }

    @Override
    @Transactional
    public void deleteGameInteraction(String userId, Integer gameId) {
        GameInteraction existingInteraction = gameInteractionRepository
                .findByUserUuidAndGameIgdbId(userId, gameId)
                .orElseThrow(() -> new EntityNotFoundException("Interação de jogo não encontrada para o usuário: " + userId + " e jogo: " + gameId));

        gameInteractionRepository.delete(existingInteraction);
    }

    @Override
    public String getPlayStatus(String userId, Integer gameId) {
        GameInteraction existingInteraction = gameInteractionRepository
                .findByUserUuidAndGameIgdbId(userId, gameId)
                .orElseThrow(() -> new EntityNotFoundException("Interação de jogo não encontrada para o usuário: " + userId + " e jogo: " + gameId));

        return existingInteraction.getPlayStatus().toString();
    }
}
