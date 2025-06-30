import "./PerfilPage.css";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProfileTab from "@/components/ui/profileTabs/ProfileTab";
import GameTab from "@/components/ui/profileTabs/GameTab";
import ReviewTab from "@/components/ui/profileTabs/ReviewTab";
import FriendTab from "@/components/ui/profileTabs/FriendTab";

function PerfilPage() {
    return (
        <div className="Perfil-page">
            <div className="Perfil-page-header-left">
                <img
                    className="Perfil-page-avatar"
                    src="https://github.com/shadcn.png"
                    alt="avatar image"
                />
                <p className="Perfil-page-user-name">Nome Usuario</p>
                <button className="Perfil-edit-button">Editar Perfil</button>
            </div>

            <Tabs defaultValue="profile" className="Perfil-page-tabs">
                //TODO: Colocar icones nas abas
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
                    <ProfileTab/>
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