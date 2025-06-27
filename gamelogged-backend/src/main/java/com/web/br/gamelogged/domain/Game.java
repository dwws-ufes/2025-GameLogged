package com.web.br.gamelogged.domain;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "game")
public class Game implements Serializable {
    @Serial
    private static final long serialVersionUID = 6892655350299656517L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer igdbId;

    private Double averageRating;

    private Integer totalUserRatings;

    public Game() {
        // Default constructor
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIgdbId() {
        return igdbId;
    }

    public void setIgdbId(Integer igdbId) {
        this.igdbId = igdbId;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalUserRatings() {
        return totalUserRatings;
    }

    public void setTotalUserRatings(Integer totalUserRatings) {
        this.totalUserRatings = totalUserRatings;
    }
}
