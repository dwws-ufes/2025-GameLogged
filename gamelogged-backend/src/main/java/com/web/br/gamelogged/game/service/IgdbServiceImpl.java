package com.web.br.gamelogged.game.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class IgdbServiceImpl implements IgdbService {

    private final WebClient webClient;

    @Autowired
    public IgdbServiceImpl(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public List<Map<String, Object>> fetchPaginatedGames(int limit, int offset) {
        String body = String.format("fields id,name,cover.url; limit %d; offset %d; where cover != null & themes != 42;", limit, offset);

        return webClient.post()
                .uri("/games")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .block();
    }

    public Map<String, Object> searchGameByName(String name) {
        Random random = new Random();
        String body = String.format(
                "fields id, name, cover.url, first_release_date, platforms.name, summary, genres.name, screenshots; " +
                        "search \"%s\"; " +
                        "limit 1;",
                name);

        List<Map<String, Object>> resultList = webClient.post()
                .uri("/games")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .block();
        if (resultList == null || resultList.isEmpty()) {
            return null;
        }

        Map<String, Object> singleGame = resultList.get(0);

        if (singleGame.containsKey("cover")) {
            Map<String, Object> coverMap = (Map<String, Object>) singleGame.get("cover");
            String originalCoverUrl = (String) coverMap.get("url");

            if (originalCoverUrl != null) {
                String largeCoverUrl = "https:" + originalCoverUrl.replace("t_thumb", "t_1080p");
                coverMap.put("url", largeCoverUrl);
            }
        }

        if (!singleGame.containsKey("screenshots")) {
            return singleGame;
        }

        List<Integer> screenshotIds = (List<Integer>) singleGame.get("screenshots");

        if (screenshotIds == null || screenshotIds.isEmpty()) {
            return singleGame;
        }

        Integer firstScreenshotId = screenshotIds.get(random.nextInt(screenshotIds.size()));
        String screenshotSearchBody = String.format(
                "fields url, image_id; where id = %d; limit 1;",
                firstScreenshotId);

        List<Map<String, Object>> screenshotResultList = webClient.post()
                .uri("/screenshots")
                .bodyValue(screenshotSearchBody)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .block();

        if (screenshotResultList != null && !screenshotResultList.isEmpty()) {
            Map<String, Object> screenshotData = screenshotResultList.get(0);
            String originalScreenshotUrl = (String) screenshotData.get("url");

            if (originalScreenshotUrl != null) {
                String largeScreenshotUrl = "https:" + originalScreenshotUrl.replace("t_thumb", "t_1080p")
                        .replace("t_screenshot_med", "t_1080p");

                singleGame.put("single_screenshot_url", largeScreenshotUrl);
            }
        }

        return singleGame;
    }
}