import React, { useEffect, useState } from 'react';
import GameCard from '@/components/ui/GameCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { gameAPI } from '@/services/APIService';
import { HomeController } from '../controllers/HomeController';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';


function HomePage() {
  const GAMES_PER_PAGE = 24;

  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const homeController = HomeController.getInstance();
  const isAuthenticated = homeController.isAuthenticated;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');


  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * GAMES_PER_PAGE;
        console.log(`Fetching games for page ${currentPage} with offset ${offset} and search term "${activeSearch}"`);
        const newGames = await homeController.fetchGames(GAMES_PER_PAGE, offset, activeSearch);

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
  }, [currentPage, activeSearch]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setCurrentPage(1);
    setActiveSearch(searchTerm);
  };

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center p-10">Carregando jogos...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  const handleGameClick = (gameName: string) => {
    navigate(`/games/${encodeURIComponent(gameName)}`);
  }

  return (
    <div className="container mx-auto px-24 py-8">
      <div className='flex flex-row justify-between items-center'>
      <h1 className="text-2xl font-bold mb-6">Catálogo de Jogos</h1>
        
      <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64 md:w-80"
          />
        </form>
        
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {games
          .filter((game) => game.hasCover)
          .map((game) => (
            <button key={game.id} onClick={() => handleGameClick(game.name)} style={{borderRadius:'20px'}}>
              <GameCard game={game} />
            </button>
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