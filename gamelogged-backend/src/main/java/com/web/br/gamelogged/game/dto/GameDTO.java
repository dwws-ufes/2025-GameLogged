package com.web.br.gamelogged.game.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GameDTO {

    @JsonProperty("id")
    private String igdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("")
    private String coverUrl;

    public GameDTO() {
    }

    public GameDTO(String igdbId, String name, String coverUrl) {
        this.igdbId = igdbId;
        this.name = name;
        this.coverUrl = coverUrl;
    }

    public String getIgdbId() {
        return igdbId;
    }

    public void setIgdbId(String igdbId) {
        this.igdbId = igdbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    @JsonProperty("cover")
    private void unpackCover(Map<String, String> cover) {
        if (cover != null && cover.get("url") != null) {
            this.coverUrl = "https://" + cover.get("url").substring(2);
            this.coverUrl = this.coverUrl.replace("t_thumb", "t_1080p");
        }
    }
}
