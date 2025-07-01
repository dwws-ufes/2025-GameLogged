import "./PerfilPage.css";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProfileTab from "@/components/ui/profileTabs/ProfileTab";
import GameTab from "@/components/ui/profileTabs/GameTab";
import ReviewTab from "@/components/ui/profileTabs/ReviewTab";
import FriendTab from "@/components/ui/profileTabs/FriendTab";
import { userAPI } from "@/services/APIService";
import { useEffect, useState } from "react";

interface UserProfile {
    uuid: string;
    nickname: string;
    profilePictureUrl: string;
    biography: string;
    creationDate: string;
    followerCount: number;
    totalGamesPlayed: number;
    totalReviewsWritten: number;
  }
  

function PerfilPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="Perfil-page">
            <div className="Perfil-page-header-left">
                <img
                    className="Perfil-page-avatar"
                    src="https://github.com/shadcn.png"
                    alt="avatar image"
                />
                <p className="Perfil-page-user-name">{user?.nickname}</p>
                <button className="Perfil-edit-button">Editar Perfil</button>
            </div>

            <Tabs defaultValue="profile" className="Perfil-page-tabs">
                <TabsList>
                    <TabsTrigger value="profile">
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="games">
                        Games
                    </TabsTrigger>
                    <TabsTrigger value="reviews">
                        Reviews
                    </TabsTrigger>
                    <TabsTrigger value="friends">
                        Friends
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileTab biography={user?.biography ?? "No biography available."} 
                                followerCount={user?.followerCount ?? 0}
                                totalGamesPlayed={user?.totalGamesPlayed ?? 0}
                                totalReviewsWritten={user?.totalReviewsWritten ?? 0}/>
                </TabsContent>

                <TabsContent value="games">
                    <GameTab/>
                </TabsContent>

                <TabsContent value="reviews">
                    <ReviewTab/>
                </TabsContent>

                <TabsContent value="friends">
                    <FriendTab/>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default PerfilPage;