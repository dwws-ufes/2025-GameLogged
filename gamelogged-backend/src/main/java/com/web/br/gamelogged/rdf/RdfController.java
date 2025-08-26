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

// MUDANÇA: Importe o IgdbService em vez do GameService
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

    // MUDANÇA: Injetando o IgdbService
    @Autowired
    private IgdbService igdbService;

    @GetMapping(value = "/games", produces = "application/rdf+xml")
    // MUDANÇA: Adicionamos parâmetros para controlar a paginação da API do IGDB
    public void getGamesRdf(@RequestParam(defaultValue = "10") int limit,
                            @RequestParam(defaultValue = "0") int offset,
                            HttpServletResponse response) throws IOException {

        logger.info("Endpoint /data/games (IGDB) acessado com limit={} e offset={}", limit, offset);

        // MUDANÇA: Chamando o método que busca dados da API do IGDB
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
        // MUDANÇA: Adicionamos uma propriedade para a imagem da capa
        Property imageProp = model.createProperty(schemaNS, "image");

        // MUDANÇA: A URI base agora aponta para um recurso do IGDB
        String baseUri = "http://gamelogged.br.com/data/igdb-game/";

        // MUDANÇA: O loop agora itera sobre uma lista de Mapas
        for (Map<String, Object> gameData : gamesFromIgdb) {

            // Extrai o ID do jogo do mapa
            Object idObj = gameData.get("id");
            if (idObj == null) continue; // Pula se não houver ID
            String gameId = idObj.toString();

            Resource gameResource = model.createResource(baseUri + gameId)
                    .addProperty(RDF.type, videoGameType);

            // Extrai o nome do jogo
            if (gameData.containsKey("name")) {
                gameResource.addProperty(nameProp, gameData.get("name").toString());
            }

            // Extrai a URL da capa (que é um objeto aninhado)
            if (gameData.containsKey("cover")) {
                try {
                    Map<String, Object> coverMap = (Map<String, Object>) gameData.get("cover");
                    String coverUrl = (String) coverMap.get("thumbnailUrl");
                    if (coverUrl != null) {
                        // A API do IGDB retorna a URL sem "https:", então adicionamos
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