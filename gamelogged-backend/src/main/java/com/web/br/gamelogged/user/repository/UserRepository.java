package com.web.br.gamelogged.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.br.gamelogged.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUuid(String uuid);
}
