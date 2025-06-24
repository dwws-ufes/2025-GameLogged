package com.web.br.gamelogged.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.br.gamelogged.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
