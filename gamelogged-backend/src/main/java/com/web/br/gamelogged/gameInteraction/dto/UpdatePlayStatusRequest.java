package com.web.br.gamelogged.gameInteraction.dto;

import com.web.br.gamelogged.domain.PlayStatus;

public class UpdatePlayStatusRequest {

    private Integer gameId;
    private PlayStatus playStatus;

    public UpdatePlayStatusRequest() {
    }

    public UpdatePlayStatusRequest(Integer gameId, PlayStatus playStatus) {
        this.gameId = gameId;
        this.playStatus = playStatus;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public PlayStatus getPlayStatus() {
        return playStatus;
    }

    public void setPlayStatus(PlayStatus playStatus) {
        this.playStatus = playStatus;
    }

    
}
