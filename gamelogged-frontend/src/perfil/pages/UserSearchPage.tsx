import React, { useState } from 'react';
import { userAPI } from '@/services/APIService';
import FriendCard from '@/components/ui/FriendCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LoaderCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface Friend {
    id: number;
    uuid: string;
    nickname: string;
    profilePictureUrl: string;
}

function UserSearchPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm.trim()) return; 

        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const results = await userAPI.searchUsers(searchTerm);
            console.log(results);
            setSearchResults(results);
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
            setError("Falha na busca. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderResults = () => {
        if (isLoading) {
            return <div className="flex justify-center p-8"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;
        }

        if (error) {
            return <div className="p-4 text-center text-red-500">{error}</div>;
        }

        if (searchResults.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {searchResults.map((user) => (
                        <FriendCard
                            key={user.id}
                            friend={{
                                id: String(user.id),
                                name: user.nickname,
                                avatarUrl: user.profilePictureUrl,
                            }}
                        />
                    ))}
                </div>
            );
        }
        
        if (hasSearched) {
            return <div className="text-center py-10 text-gray-500">Nenhum usuário encontrado para "{searchTerm}".</div>;
        }
        
        return <div className="text-center py-10 text-gray-500">Digite um nome para buscar novos usuários.</div>;
    };


    return (
        <div className="container mx-auto max-w-4xl py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Encontrar Usuários</h1>
            
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-lg mx-auto">
                <Input
                    type="text"
                    placeholder="Digite o nickname do usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit" disabled={isLoading}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                </Button>
                <Button onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
            </form>

            <div className="mt-6">
                {renderResults()}
            </div>
        </div>
    );
}

export default UserSearchPage;