package com.web.br.gamelogged.domain;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "review")
public class Review implements Serializable {

    @Serial
    private static final long serialVersionUID = 4446654532893948751L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double rating;

    @Column(length = 400)
    private String description;

    private Double playTimeInHours;

    @Enumerated(EnumType.STRING)
    private PlatformType platformType;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private GameInteraction gameInteraction;

    public Review() {
        // Default constructor
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPlayTimeInHours() {
        return playTimeInHours;
    }

    public void setPlayTimeInHours(Double playTimeInHours) {
        this.playTimeInHours = playTimeInHours;
    }

    public PlatformType getPlatformType() {
        return platformType;
    }

    public void setPlatformType(PlatformType platformType) {
        this.platformType = platformType;
    }

    public GameInteraction getGameInteraction() {
        return gameInteraction;
    }

    public void setGameInteraction(GameInteraction gameInteraction) {
        this.gameInteraction = gameInteraction;
    }
}
