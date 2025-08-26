package com.gamelogged.rdf;

import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gamelogged.models.Game;
import com.gamelogged.services.GameService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/data")
public class RdfController {

    @Autowired
    private GameService gameService;

    @GetMapping(value = "/games", produces = "application/rdf+xml")
    public void getGamesRdf(HttpServletResponse response) throws IOException {
        List<Game> games = gameService.getAllGames();

        Model model = ModelFactory.createDefaultModel();
        String schemaNS = "https://schema.org/";
        model.setNsPrefix("schema", schemaNS);

        // Use "VideoGame" do schema.org
        Resource videoGameType = model.createResource(schemaNS + "VideoGame");

        // Propriedades do schema.org
        Property nameProp = model.createProperty(schemaNS, "name");
        Property descriptionProp = model.createProperty(schemaNS, "description");
        Property developerProp = model.createProperty(schemaNS, "developer");
        Property datePublishedProp = model.createProperty(schemaNS, "datePublished");
        Property gamePlatformProp = model.createProperty(schemaNS, "gamePlatform");

        String baseUri = "http://localhost:8080/data/game/";

        for (Game game : games) {
            Resource gameResource = model.createResource(baseUri + game.getId())
                    .addProperty(RDF.type, videoGameType)
                    .addProperty(nameProp, game.getTitle())
                    .addProperty(descriptionProp, game.getDescription());

            // Adicione outras propriedades se existirem
            if (game.getDeveloper() != null) {
                gameResource.addProperty(developerProp, game.getDeveloper());
            }
            if (game.getPublisher() != null) {
                gameResource.addProperty(RDFS.comment, "Publisher: " + game.getPublisher());
            }
            if
            if (game.getReleaseDate() != null) {
                // Formate a data para o padrão ISO (ex: "2023-10-05")
                String isoDate = game.getReleaseDate().toString(); // Ajuste se necessário
                gameResource.addProperty(datePublishedProp, isoDate);
            }
            if (game.getPlatform() != null) {
                gameResource.addProperty(gamePlatformProp, game.getPlatform());
            }
        }

        response.setContentType("application/rdf+xml");
        try (PrintWriter out = response.getWriter()) {
            model.write(out, "RDF/XML");
        }
    }
}