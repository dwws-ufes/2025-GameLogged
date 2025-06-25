package com.web.br.gamelogged.user.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
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

    
}
