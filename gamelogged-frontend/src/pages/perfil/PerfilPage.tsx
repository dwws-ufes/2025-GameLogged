import "./PerfilPage.css"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
function PerfilPage() {
  return (
      <div className={"Perfil-page"}>
          <div className={"Perfil-page-header-left"}>
              <img className="Perfil-page-avatar" src={"https://github.com/shadcn.png"} alt={"avatar image"} />
              <p className="Perfil-page-user-name">
                  Nome Usuario
              </p>
              <button className="Perfil-edit-button" >
                  Editar Perfil
              </button>
          </div>
          
          <Tabs defaultValue="account" className="Perfil-page-tabs">
              <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="games">Games</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">Bio, jogos jogados recentemente .</TabsContent>
              <TabsContent value="games">Jogos que o usuario interagiu.</TabsContent>
              <TabsContent value="reviews">Lista de todos os reviews feitos pelo usuario.</TabsContent>
              <TabsContent value="friends">Lista de amigos </TabsContent>
          </Tabs>
      </div>




  );
}
export default PerfilPage;