package com.web.br.gamelogged.user.controller;

import java.util.Map;
import java.util.Set;

import com.web.br.gamelogged.domain.GameInteraction;
import com.web.br.gamelogged.user.dto.UpdateProfileDTO;
import com.web.br.gamelogged.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.service.UserService;
import com.web.br.gamelogged.domain.GameInteraction;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser() {
        String uuid = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return this.getUserProfile(uuid);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<Map<String, String>> getUserProfile(@PathVariable String uuid) {
        try {
            User user = userService.findByUuid(uuid);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Usuário não encontrado."));
            }

            return ResponseEntity.ok(UserMapper.toDTO(user));
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

    @GetMapping("/game-interactions")
    public ResponseEntity<?> getCurrentUserGameInteractions() {
        try {
            String uuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            Set<GameInteraction> gameInteractions = userService.getGameInteractionsForUser(uuid);

            return ResponseEntity.ok(gameInteractions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Map<String, String>> updateUserProfile(@RequestBody UpdateProfileDTO profileData) {
        try {
            String uuid = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            System.out.println("Atualizando perfil do usuário: " + uuid);
            System.out.println("Dados do perfil: " + profileData.getNickname() + ", " + profileData.getProfilePictureUrl() + ", " + profileData.getBiography());
            userService.updateUserProfile(uuid, profileData.getNickname(), profileData.getProfilePictureUrl(), profileData.getBiography());
            return ResponseEntity.ok(Map.of("message", "Perfil atualizado com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
