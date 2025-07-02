package com.web.br.gamelogged.user.service;

import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.domain.GameInteraction;

import java.util.List;
import java.util.Set;

public interface UserService {

    void createUser(String uid, String nickname);

    User findByUuid(String token);

    void followUser(String currentUserUuid, String targetUserUuid);

    void unfollowUser(String currentUserUuid, String targetUserUuid);

    Set<User> getFollowingForUser(String uuid);

    Set<User> getFollowersForUser(String uuid);

    Set<GameInteraction> getGameInteractionsForUser(String uuid);

    void updateUserProfile(String uuid, String nickname, String profilePictureUrl, String biography);

    List<User> findUsersByNickname(String nickname);
}
