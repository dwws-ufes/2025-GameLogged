import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home/pages/Home";
import LandingPage from "./authentication/pages/LandingPage";
import Layout from './components/layout/Layout';
import { Toaster } from "@/components/ui/sonner"
import GamePage from './game/pages/Game';
import PerfilPage from "@/perfil/pages/PerfilPage";
import EditProfilePage from "@/perfil/pages/EditProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position='bottom-center' expand={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/games/:gameName" element={<GamePage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/perfil/editar" element={<EditProfilePage />} /> {/* ROTA NOVA */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
