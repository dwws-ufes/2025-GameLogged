import { useParams } from "react-router-dom";

const loadGame = {
  fetchPaginatedGames: async (limit: number, offset: number) => {
    console.log(`Buscando na API: limit=${limit}, offset=${offset}`);

    // TODO: implementar consulta no igdb 

    return Array.from({ length: limit }, (_, index) => ({
      id: offset + index + 1,
      name: `Game #${offset + index + 1}`,
      coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93cr.jpg?text=Game+${offset + index + 1}`, // URL de imagem de placeholder
    }));
  },
};

function GamePage() {
    const { gameName } = useParams<{ gameName: string }>();

    return (
        <div>
            <h1>Game Page: {gameName}</h1>
        </div>
    );
}

export default GamePage;