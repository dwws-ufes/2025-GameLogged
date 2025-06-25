package com.web.br.gamelogged.user.service;

import com.web.br.gamelogged.domain.User;

public interface UserService {

    void createUser(String uid, String nickname);

    public User findByUuid(String token);

}
