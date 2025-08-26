package com.web.br.gamelogged.rdf;

import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.web.br.gamelogged.game.service.IgdbService;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/data")
public class RdfController {

    private static final Logger logger = LoggerFactory.getLogger(RdfController.class);

    @Autowired
    private IgdbService igdbService;

    @GetMapping(value = "/games", produces = "application/rdf+xml")
    public void getGamesRdf(@RequestParam(defaultValue = "10") int limit,
                            @RequestParam(defaultValue = "0") int offset,
                            HttpServletResponse response) throws IOException {

        logger.info("Endpoint /data/games (IGDB) acessado com limit={} e offset={}", limit, offset);

        List<Map<String, Object>> gamesFromIgdb = igdbService.fetchPaginatedGames(limit, offset);

        if (gamesFromIgdb == null || gamesFromIgdb.isEmpty()) {
            logger.warn("Nenhum jogo encontrado na API do IGDB para os parâmetros fornecidos");
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Nenhum jogo encontrado na API do IGDB");
            return;
        }

        Model model = ModelFactory.createDefaultModel();
        String schemaNS = "https://schema.org/";
        model.setNsPrefix("schema", schemaNS);

        Resource videoGameType = model.createResource(schemaNS + "VideoGame");
        Property nameProp = model.createProperty(schemaNS, "name");
        Property imageProp = model.createProperty(schemaNS, "image");

        String baseUri = "http://localhost:8080/data/igdb-game/";


        for (Map<String, Object> gameData : gamesFromIgdb) {

            Object idObj = gameData.get("id");
            if (idObj == null) continue;
            String gameId = idObj.toString();

            Resource gameResource = model.createResource(baseUri + gameId)
                    .addProperty(RDF.type, videoGameType);

            if (gameData.containsKey("name")) {
                gameResource.addProperty(nameProp, gameData.get("name").toString());
            }

            if (gameData.containsKey("cover")) {
                try {
                    Map<String, Object> coverMap = (Map<String, Object>) gameData.get("cover");
                    String coverUrl = (String) coverMap.get("thumbnailUrl");
                    if (coverUrl != null) {
                        String fullCoverUrl = "https:" + coverUrl;
                        gameResource.addProperty(imageProp, model.createResource(fullCoverUrl));
                    }
                } catch (Exception e) {
                    logger.error("Erro ao processar a capa do jogo com ID: {}", gameId, e);
                }
            }
        }

        response.setContentType("application/rdf+xml");
        try (PrintWriter out = response.getWriter()) {
            model.write(out, "RDF/XML-ABBREV");
            logger.info("RDF gerado com sucesso para {} jogos da API do IGDB", gamesFromIgdb.size());
        } catch (Exception e) {
            logger.error("Erro ao gerar RDF", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao gerar RDF");
        }
    }
}