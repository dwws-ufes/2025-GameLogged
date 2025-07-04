package com.web.br.gamelogged.user.mapper;

import com.web.br.gamelogged.domain.User;
import com.web.br.gamelogged.user.dto.UserDTO;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    public static Map<String, String> toDTO(User user) {
        if (user == null) {
            return null;
        }

        return Map.of(
                "uuid", user.getUuid() != null ? user.getUuid() : "",
                "nickname", user.getNickname() != null ? user.getNickname() : "",
                "profilePictureUrl", user.getProfilePictureUrl() != null ? user.getProfilePictureUrl() : "",
                "biography", user.getBiography() != null ? user.getBiography() : "",
                "creationDate", user.getCreationDate() != null ? user.getCreationDate().toString() : "",
                "followersCount", String.valueOf(user.getFollowers().size()),
                "playedCount", String.valueOf(user.getGameInteractions().size()),
                "reviewCount", String.valueOf(user.getGameInteractions().stream().filter(gi -> gi.getReview() != null).toList().size()),
                "averageRating", String.valueOf(user.getGameInteractions().stream()
                        .filter(gi -> gi.getReview() != null)
                        .mapToDouble(gi -> gi.getReview().getRating())
                        .average()
                        .orElse(0.0)));
    }

    public static UserDTO toSummaryDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setUuid(user.getUuid());
        dto.setNickname(user.getNickname());
        dto.setProfilePictureUrl(user.getProfilePictureUrl());
        dto.setBiography(user.getBiography());
        dto.setCreationDate(user.getCreationDate().toString());

        return dto;
    }

    public static List<UserDTO> toUserDTOList(Set<User> users) {
        if (users == null) {
            return List.of();
        }

        return users.stream().map(UserMapper::toSummaryDTO).collect(Collectors.toList());
    }
}
