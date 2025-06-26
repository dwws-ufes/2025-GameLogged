import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LandingPage from "./pages/landing-page/LandingPage";
import Layout from './components/layout/Layout';
import { Toaster } from "@/components/ui/sonner"
import GamePage from './pages/game/Game';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='bottom-center' expand={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/game/:gameName" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
