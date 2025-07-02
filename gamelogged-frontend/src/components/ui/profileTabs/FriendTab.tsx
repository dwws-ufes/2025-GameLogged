import "./profileTabs.css";
import FriendCard from "@/components/ui/FriendCard";
import {AuthController} from "@/authentication/controllers/AuthController.ts";
import {useEffect, useState} from "react";

function FriendTab() {
    const {user} = AuthController.getInstance();
    const [seguidores, setSeguidores] = useState<any[]>([]);
    const [seguindo, setSeguindo] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'seguindo' | 'seguidores'>('seguindo');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!user?.id) return;

                const response = await fetch(`https://api.gamelogged.com/users/${user.id}/friends`);

                if (!response.ok) {
                    throw new Error('Erro ao carregar amigos');
                }

                const data = await response.json();
                setSeguidores(data.followers || []);
                setSeguindo(data.following || []);

            } catch (error) {
                console.error("Erro ao buscar amigos:", error);
                setError('Falha ao carregar lista de amigos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFriends();
    }, [user?.id]);

    const handleTabChange = (tab: 'seguindo' | 'seguidores') => {
        setActiveTab(tab);
    };

    if (isLoading) {
        return <div className="profile-tabs-loading">Carregando...</div>;
    }

    if (error) {
        return <div className="profile-tabs-error">{error}</div>;
    }

    const currentList = activeTab === 'seguindo' ? seguindo : seguidores;

    return (
        <div className="profile-tabs-friends">
            <div className="profile-tabs-friends-buttons">
                <button
                    className={`profile-tabs-friends-button ${activeTab === 'seguindo' ? 'active' : ''}`}
                    onClick={() => handleTabChange('seguindo')}
                >
                    Seguindo ({seguindo.length})
                </button>
                <button
                    className={`profile-tabs-friends-button ${activeTab === 'seguidores' ? 'active' : ''}`}
                    onClick={() => handleTabChange('seguidores')}
                >
                    Seguidores ({seguidores.length})
                </button>
            </div>

            <div className="profile-tabs-friends-list">
                {currentList.length > 0 ? (
                    currentList.map((friend) => (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                            variant={activeTab === 'seguidores' ? 'follower' : 'following'}
                            onFollowToggle={(friendId, newState) => {
                                console.log(`Amigo ${friendId} agora está ${newState ? 'seguindo' : 'não seguindo'}`);
                            }}
                        />
                    ))
                ) : (
                    <div className="profile-tabs-empty">
                        Nenhum {activeTab === 'seguindo' ? 'amigo seguido' : 'seguidor'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendTab;