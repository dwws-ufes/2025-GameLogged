package com.web.br.gamelogged.user.service;

import com.web.br.gamelogged.domain.User;

import java.util.Set;

public interface UserService {

    void createUser(String uid, String nickname);

    User findByUuid(String token);

    void followUser(String currentUserUuid, String targetUserUuid);

    void unfollowUser(String currentUserUuid, String targetUserUuid);

    Set<User> getFollowingForUser(String uuid);

    Set<User> getFollowersForUser(String uuid);

}
