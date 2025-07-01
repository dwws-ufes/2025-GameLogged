package com.web.br.gamelogged.review.repository;

import com.web.br.gamelogged.domain.GameInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<GameInteraction, Long> {
}
