package com.web.br.gamelogged.game.repository;

import com.web.br.gamelogged.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByIgdbId(Integer igdbId);
}
