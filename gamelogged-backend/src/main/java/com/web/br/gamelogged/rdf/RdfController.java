package com.web.br.gamelogged.rdf;

import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.br.gamelogged.domain.Game;
import com.web.br.gamelogged.game.service.GameService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/data")
public class RdfController {

    private static final Logger logger = LoggerFactory.getLogger(RdfController.class);

    @Autowired
    private GameService gameService;

    @GetMapping(value = "/games", produces = "application/rdf+xml")
    public void getGamesRdf(HttpServletResponse response) throws IOException {
        logger.info("Endpoint /data/games acessado");
        List<Game> games = gameService.getAllGames();

        if (games == null || games.isEmpty()) {
            logger.warn("Nenhum jogo encontrado");
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Nenhum jogo encontrado");
            return;
        }

        Model model = ModelFactory.createDefaultModel();
        String schemaNS = "https://schema.org/";
        model.setNsPrefix("schema", schemaNS);

        Resource videoGameType = model.createResource(schemaNS + "VideoGame");
        Property nameProp = model.createProperty(schemaNS, "name");
        Property aggregateRatingProp = model.createProperty(schemaNS, "aggregateRating");
        Property ratingCountProp = model.createProperty(schemaNS, "ratingCount");

        String baseUri = "http://localhost:8080/data/game/";

        for (Game game : games) {
            Resource gameResource = model.createResource(baseUri + game.getId())
                    .addProperty(RDF.type, videoGameType)
                    .addProperty(nameProp, "Game ID: " + game.getIgdbId()); // Usando igdbId como nome

            if (game.getAverageRating() != null) {
                gameResource.addProperty(aggregateRatingProp, game.getAverageRating().toString());
            }
            if (game.getTotalUserRatings() != null) {
                gameResource.addProperty(ratingCountProp, game.getTotalUserRatings().toString());
            }
        }

        response.setContentType("application/rdf+xml");
        try (PrintWriter out = response.getWriter()) {
            model.write(out, "RDF/XML");
            logger.info("RDF gerado com sucesso para {} jogos", games.size());
        } catch (Exception e) {
            logger.error("Erro ao gerar RDF", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao gerar RDF");
        }
    }
}