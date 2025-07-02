import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/ui/profileTabs/ProfileTab";
import GameTab from "@/components/ui/profileTabs/GameTab";
import ReviewTab from "@/components/ui/profileTabs/ReviewTab";
import FriendTab from "@/components/ui/profileTabs/FriendTab";
import { userAPI } from "@/services/APIService";
import { useNavigate } from 'react-router-dom';

import './PerfilPage.css';
import { Button } from '@/components/ui/button';


interface UserProfile {
    uuid: string;
    nickname: string;
    profilePictureUrl: string;
    biography: string;
    creationDate: string;
    followersCount: number;
    totalGamesPlayed: number;
    reviewCount: number;
    averageRating: number;
}

function PerfilPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleEditProfileClick = () => {
        navigate('/perfil/editar');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userAPI.getCurrentUser();
                setUser(userData);
            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
                setError("Não foi possível carregar o perfil. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mx-auto m-w-90p py-8 flex flex-col gap-8">

            <div className="w-full flex items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">

                <img
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                    src={user?.profilePictureUrl || "https://github.com/shadcn.png"}
                    alt="avatar image"
                />

                <div className="ml-6 flex-grow">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {user?.nickname}
                    </p>
                </div>

                <button 
                    onClick={handleEditProfileClick}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    Editar Perfil
                </button>
            </div>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="games">Jogos</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="friends">Amigos</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-4">
                    <ProfileTab
                        biography={user?.biography ?? "Nenhuma biografia disponível."}
                        followerCount={user?.followersCount ?? 0}
                        totalGamesPlayed={user?.totalGamesPlayed ?? 0}
                        reviewCount={user?.reviewCount ?? 0}
                        averageRating={parseFloat(Number(user?.averageRating!).toFixed(2)) ?? 0.0}
                    />
                </TabsContent>

                <TabsContent value="games" className="mt-4">
                    <GameTab />
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                    <ReviewTab />
                </TabsContent>

                <TabsContent value="friends" className="mt-4">
                    <FriendTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default PerfilPage;