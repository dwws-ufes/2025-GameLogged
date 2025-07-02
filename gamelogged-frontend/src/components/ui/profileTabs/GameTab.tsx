import "./profileTabs.css";
import GameCard from '@/components/ui/GameCard';
import {useEffect, useState} from "react";
import {gameAPI } from "@/services/APIService.ts";


function GameTab() {
    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserGames = async () => {
            setIsLoading(true);
            setError(null);

            try {

                const gameInteractions = await gameAPI.getCurrentGameInteractions();

                setGames(gameInteractions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                console.error("Erro na busca:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserGames();
    }, []);


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
        </div>
    );
}

export default GameTab;