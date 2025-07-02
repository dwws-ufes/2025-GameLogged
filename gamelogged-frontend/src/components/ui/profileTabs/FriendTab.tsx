import React, { useEffect, useState } from 'react';
import FriendCard from "@/components/ui/FriendCard";
import { userAPI } from "@/services/APIService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from '@heroui/react';

interface Friend {
    id: number;
    nickname: string;
    profilePictureUrl: string;
    biography: string;
}

function FriendTab() {
    const [followers, setFollowers] = useState<Friend[]>([]);
    const [following, setFollowing] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriendsData = async () => {
            try {
                const [followersResponse, followingResponse] = await Promise.all([
                    userAPI.getUserFollowers(),
                    userAPI.getUserFollowing()
                ]);
                console.log(followersResponse);
                console.log(followingResponse);
                setFollowers(followersResponse || []);
                setFollowing(followingResponse || []);

            } catch (err) {
                console.error("Erro ao buscar dados de amigos:", err);
                setError("Não foi possível carregar os dados. Tente novamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFriendsData();
    }, []);

    const goToSearchPage = () => {
        navigate('/users/search');
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <Tabs defaultValue="following" className="w-full">
            <div className="flex justify-between items-center mb-4">
                <TabsList className="grid w-full max-w-sm grid-cols-2">
                    <TabsTrigger value="following">
                        Seguindo ({following.length})
                    </TabsTrigger>
                    <TabsTrigger value="followers">
                        Seguidores ({followers.length})
                    </TabsTrigger>
                </TabsList>
                <Button onPress={goToSearchPage}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar Usuários
                </Button>
            </div>

            <TabsContent value="following" className="mt-4">
                {following.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {following.map((friend) => (
                            <FriendCard
                                key={friend.id}
                                friend={{
                                    id: String(friend.id),
                                    name: friend.nickname,
                                    avatarUrl: friend.profilePictureUrl,
                                }}
                                variant={'following'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">Você não está seguindo ninguém.</div>
                )}
            </TabsContent>

            <TabsContent value="followers" className="mt-4">
                {followers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {followers.map((friend) => (
                            <FriendCard
                                key={friend.id}
                                friend={{
                                    id: String(friend.id),
                                    name: friend.nickname,
                                    avatarUrl: friend.profilePictureUrl,
                                }}
                                variant={'follower'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">Você ainda não tem seguidores.</div>
                )}
            </TabsContent>
        </Tabs>
    );
}

export default FriendTab;