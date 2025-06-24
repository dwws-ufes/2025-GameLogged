package com.web.br.gamelogged.user.service;

import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createUser(String uuid, String nickname) {
        User newUser = new User();
        newUser.setUuid(uuid);
        newUser.setCreationDate(Date.from(Instant.now()));
        newUser.setNickname(nickname);

        userRepository.save(newUser);
    }

    
}
