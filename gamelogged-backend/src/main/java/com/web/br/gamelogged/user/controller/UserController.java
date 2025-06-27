package com.web.br.gamelogged.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.Context;
import com.google.firebase.auth.FirebaseAuthException;
import com.web.br.gamelogged.auth.services.AuthService;
import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public ResponseEntity<Map<String, String>> getCurrentUser() {
        String uuid = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        User user = userService.findByUuid(uuid);

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Usuário não encontrado."));
        }

        return ResponseEntity.ok(Map.of(
                "uuid", user.getUuid() != null ? user.getUuid() : "",
                "nickname", user.getNickname() != null ? user.getNickname() : "",
                "profilePictureUrl", user.getProfilePictureUrl() != null ? user.getProfilePictureUrl() : "",
                "biography", user.getBiography() != null ? user.getBiography() : "",
                "creationDate", user.getCreationDate() != null ? user.getCreationDate().toString() : ""));
    }
}
