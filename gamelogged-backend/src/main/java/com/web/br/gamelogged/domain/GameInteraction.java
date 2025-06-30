package com.web.br.gamelogged.domain;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "game_interaction")
public class GameInteraction implements Serializable {

    @Serial
    private static final long serialVersionUID = -2997722139383716979L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(mappedBy = "gameInteraction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Review review;

    @Enumerated(EnumType.STRING)
    private PlayStatus playStatus;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    public GameInteraction() {
        //  Default constructor
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public PlayStatus getPlayStatus() {
        return playStatus;
    }

    public void setPlayStatus(PlayStatus playStatus) {
        this.playStatus = playStatus;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}

