import "./profileTabs.css"
import GameCard from '@/components/ui/GameCard';
import {useEffect, useState} from "react";

const igdbApi = {
    fetchPaginatedGames: async (limit: number, offset: number) => {
        console.log(`Buscando na API: limit=${limit}, offset=${offset}`);

        // TODO: implementar consulta no igdb

        return Array.from({length: limit}, (_, index) => ({
            id: offset + index + 1,
            name: `Game #${offset + index + 1}`,
            coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93cr.jpg?text=Game+${offset + index + 1}`, // URL de imagem de placeholder
        }));
    },
};

function GameTab() {

    // Simulating a list of games for demonstration purposes
    const GAMES_PER_PAGE = 12;

    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    useEffect(() => {
        const fetchGames = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const offset = (currentPage - 1) * GAMES_PER_PAGE;
                const newGames = await igdbApi.fetchPaginatedGames(GAMES_PER_PAGE, offset);

                setGames(newGames);
                setHasNextPage(newGames.length === GAMES_PER_PAGE);

            } catch (err) {
                setError('Falha ao carregar os jogos. Tente novamente mais tarde.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, [currentPage]);

    const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(1, prevPage - 1));

    if (isLoading) {
        return <div className="text-center p-10">Carregando jogos...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    return (
        <div className="profile-tabs-games">
            <div className={"profile-tab-grid-container"}>
                {games.map((game) =>
                    <GameCard key={game.id} game={game}/>
                )}
            </div>
            <div className={"divider"}/>
        </div>
    );
}

export default GameTab;