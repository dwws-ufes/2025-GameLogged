import React, { useEffect, useState } from 'react';

import GameCard from '@/components/ui/GameCard'; 

const igdbApi = {
  fetchPaginatedGames: async (limit: number, offset: number) => {
    console.log(`Buscando na API: limit=${limit}, offset=${offset}`);
    // Aqui você faria a chamada real para a API do IGDB
    // Por enquanto, vamos simular uma resposta com dados falsos.
    // O 'id' precisa ser único para cada item e página para evitar problemas de chave no React.
    return Array.from({ length: limit }, (_, index) => ({
      id: offset + index + 1,
      name: `Game #${offset + index + 1}`,
      coverUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93cr.jpg?text=Game+${offset + index + 1}`, // URL de imagem de placeholder
    }));
  },
};

function HomePage() {
  const GAMES_PER_PAGE = 24;

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
    <div className="container mx-auto px-24 py-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Jogos</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          Anterior
        </button>
        <span className="font-semibold">Página {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default HomePage;