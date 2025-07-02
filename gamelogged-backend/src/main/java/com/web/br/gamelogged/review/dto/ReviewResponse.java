package com.web.br.gamelogged.review.dto;

import java.time.LocalDate;

public class ReviewResponse {
    private String nickname;
    private String reviewText;
    private String playStatus;
    private String timePlayed;
    private String profilePicUrl;
    private Double rating;
    private String platform;
    private LocalDate creationDate;
    private String gameId;



    public ReviewResponse() {
    }

    public ReviewResponse(String nickname, String reviewText, String playStatus, String timePlayed,
                          String profilePicUrl, Double rating, String platform, LocalDate creationDate, String gameId) {
        this.nickname = nickname;
        this.reviewText = reviewText;
        this.playStatus = playStatus;
        this.timePlayed = timePlayed;
        this.profilePicUrl = profilePicUrl;
        this.rating = rating;
        this.platform = platform;
        this.creationDate = creationDate;
        this.gameId = gameId;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPlayStatus() {
        return playStatus;
    }

    public void setPlayStatus(String playStatus) {
        this.playStatus = playStatus;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public String getTimePlayed() {
        return timePlayed;
    }

    public void setTimePlayed(String timePlayed) {
        this.timePlayed = timePlayed;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }
}
