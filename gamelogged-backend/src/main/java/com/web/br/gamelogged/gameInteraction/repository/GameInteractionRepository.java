package com.web.br.gamelogged.gameInteraction.repository;

import com.web.br.gamelogged.domain.GameInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GameInteractionRepository extends JpaRepository<GameInteraction, Long> {
    @Query("SELECT gi FROM GameInteraction gi WHERE gi.user.uuid = :userUuid AND gi.game.igdbId = :igdbId")
    Optional<GameInteraction> findByUserUuidAndGameIgdbId(@Param("userUuid") String userUuid, @Param("igdbId") Integer igdbId);
}
