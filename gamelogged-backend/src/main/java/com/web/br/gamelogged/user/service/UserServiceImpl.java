package com.web.br.gamelogged.user.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void createUser(String uuid, String nickname) {
        User newUser = new User();
        newUser.setUuid(uuid);
        newUser.setCreationDate(LocalDateTime.now());
        newUser.setNickname(nickname);

        userRepository.save(newUser);
    }

    @Override
    public User findByUuid(String uuid) {
        return userRepository.findByUuid(uuid).orElse(null);
    }

    @Override
    @Transactional
    public void followUser(String currentUserUuid, String targetUserUuid) {
        User currentUser = userRepository.findByUuid(currentUserUuid).orElse(null);
        User targetUser = userRepository.findByUuid(targetUserUuid).orElse(null);


        if (currentUser == null) {
            throw new IllegalArgumentException("Usuário atual não encontrado.");
        }

        if (targetUser == null) {
            throw new IllegalArgumentException("Usuário alvo não encontrado.");
        }

        if (currentUser.getFollowing().contains(targetUser)) {
            throw new IllegalArgumentException("Você já está seguindo este usuário.");
        }

        targetUser.getFollowers().add(currentUser);
        userRepository.save(targetUser);

    }

    @Override
    @Transactional
    public void unfollowUser(String currentUserUuid, String targetUserUuid) {
        User currentUser = userRepository.findByUuid(currentUserUuid).orElse(null);
        User targetUser = userRepository.findByUuid(targetUserUuid).orElse(null);

        if (currentUser == null) {
            throw new IllegalArgumentException("Usuário atual não encontrado.");
        }

        if (targetUser == null) {
            throw new IllegalArgumentException("Usuário alvo não encontrado.");
        }

        if (!currentUser.getFollowing().contains(targetUser)) {
            throw new IllegalArgumentException("Você não está seguindo este usuário.");
        }

        targetUser.getFollowers().remove(currentUser);
        userRepository.save(targetUser);
    }

    @Override
    public Set<User> getFollowingForUser(String uuid) {
        User user = userRepository.findByUuid(uuid).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        return user.getFollowing();
    }

    @Override
    public Set<User> getFollowersForUser(String uuid) {
        User user = userRepository.findByUuid(uuid).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        return user.getFollowers();
    }


    
}
