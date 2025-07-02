package com.web.br.gamelogged.user.service;

import java.time.LocalDateTime;
import java.util.Set;

import com.web.br.gamelogged.domain.GameInteraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.repository.UserRepository;
import com.web.br.gamelogged.domain.GameInteraction;

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
        User currentUser = userRepository.findByUuid(currentUserUuid).orElseThrow(() -> new IllegalArgumentException("Usuário atual não encontrado."));
        User targetUser = userRepository.findByUuid(targetUserUuid).orElseThrow(() -> new IllegalArgumentException("Usuário alvo não encontrado."));

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

    @Override
    public Set<GameInteraction> getGameInteractionsForUser(String uuid) {
        User user = userRepository.findByUuid(uuid).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        return user.getGameInteractions();
    }

    public void updateUserProfile(String uuid, String nickname, String profilePictureUrl, String biography) {
        User user = userRepository.findByUuid(uuid).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        if (nickname != null && !nickname.isEmpty()) {
            user.setNickname(nickname);
        }
        if (profilePictureUrl != null && !profilePictureUrl.isEmpty()) {
            user.setProfilePictureUrl(profilePictureUrl);
        }
        if (biography != null && !biography.isEmpty()) {
            user.setBiography(biography);
        }

        userRepository.save(user);
    }

}
