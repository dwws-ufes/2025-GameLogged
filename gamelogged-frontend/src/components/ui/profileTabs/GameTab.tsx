import "./profileTabs.css";
import GameCard from '@/components/ui/GameCard';
import {useEffect, useState} from "react";
import {AuthController} from "@/authentication/controllers/AuthController.ts";

const GAMES_PER_PAGE = 12;

function GameTab() {
    const {user} = AuthController.getInstance();
    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserGames = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!user?.id) return;

                const offset = (currentPage - 1) * GAMES_PER_PAGE;
                const response = await fetch(
                    `https://api.gamelogged.com/users/${user.id}/games?limit=${GAMES_PER_PAGE}&offset=${offset}`
                );

                if (!response.ok) {
                    throw new Error('Erro ao carregar jogos');
                }

                const data = await response.json();
                setGames(data);
                setHasNextPage(data.length === GAMES_PER_PAGE);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                console.error("Erro na busca:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserGames();
    }, [currentPage, user?.id]);

    const goToNextPage = () => hasNextPage && setCurrentPage(prev => prev + 1);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));

    if (isLoading) {
        return <div className="text-center p-10">Carregando jogos...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    if (games.length === 0) {
        return <div className="text-center p-10">Nenhum jogo encontrado</div>;
    }

    return (
        <div className="profile-tabs-games">
            <div className="profile-tab-grid-container">
                {games.map((game) => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </div>

            <div className="pagination-controls">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span>Página {currentPage}</span>

                <button
                    onClick={goToNextPage}
                    disabled={!hasNextPage}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default GameTab;