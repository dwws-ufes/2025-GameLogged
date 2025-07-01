package com.web.br.gamelogged.user.controller;

import java.util.Map;
import java.util.Set;

import com.web.br.gamelogged.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

        return ResponseEntity.ok(UserMapper.toMap(user));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<Map<String, String>> getUserProfile(@PathVariable String uuid) {
        try {
            User user = userService.findByUuid(uuid);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Usuário não encontrado."));
            }

            return ResponseEntity.ok(UserMapper.toMap(user));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{uuid}/follow")
    public ResponseEntity<Map<String, String>> followUser(@PathVariable String uuid) {
        try {
            String currentUserUuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();
            userService.followUser(currentUserUuid, uuid);
            return ResponseEntity.ok(Map.of("message", "Usuário seguido com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{uuid}/unfollow")
    public ResponseEntity<Map<String, String>> unfollowUser(@PathVariable String uuid) {
        try {
            String currentUserUuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();
            userService.unfollowUser(currentUserUuid, uuid);
            return ResponseEntity.ok(Map.of("message", "Usuário deixado de seguir com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/following")
    public ResponseEntity<?> getCurrentUserFollowing() {
        try {
            String uuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            Set<User> followingSet = userService.getFollowingForUser(uuid);

            return ResponseEntity.ok(UserMapper.toUserDTOList(followingSet));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/followers")
    public ResponseEntity<?> getCurrentUserFollowers() {
        try {
            String uuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            Set<User> followersSet = userService.getFollowersForUser(uuid);

            return ResponseEntity.ok(UserMapper.toUserDTOList(followersSet));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

}
