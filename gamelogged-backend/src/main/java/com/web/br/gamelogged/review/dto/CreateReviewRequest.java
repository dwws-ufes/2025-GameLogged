package com.web.br.gamelogged.review.dto;

import com.web.br.gamelogged.domain.PlayStatus;

import java.sql.Time;

public class CreateReviewRequest {
    private String userId;
    private Integer gameId;
    private String reviewText;
    private double rating;
    private String platform;
    private Time playTimeInHours;
    private PlayStatus playStatus;

    public CreateReviewRequest(String userId, Integer gameId, String reviewText, double rating, String platform, Time playTimeInHours, PlayStatus playStatus) {
        this.userId = userId;
        this.gameId = gameId;
        this.reviewText = reviewText;
        this.rating = rating;
        this.platform = platform;
        this.playTimeInHours = playTimeInHours;
        this.playStatus = playStatus;

    }

    public String getUserId() {
        return userId;
    }

    public Integer getGameId() {
        return gameId;
    }

    public String getReviewText() {
        return reviewText;
    }

    public double getRating() {
        return rating;
    }

    public String getPlatform() {
        return platform;
    }

    public Time getPlayTimeInHours() {
        return playTimeInHours;
    }

    public PlayStatus getPlayStatus() {
        return playStatus;
    }

    public void setPlayStatus(PlayStatus playStatus) {
        this.playStatus = playStatus;
    }
}
