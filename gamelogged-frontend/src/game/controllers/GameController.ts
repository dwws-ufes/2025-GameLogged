import { AuthController } from "@/authentication/controllers/AuthController";
import { gameAPI } from "@/services/APIService";
import { toast } from "sonner";
import type { PlayStatus } from "../enum/PlayStatus";

export class GameController {
    private static instance: GameController;
    public isUserAuthenticated: boolean = false;


    constructor() {
        this.isUserAuthenticated = AuthController.getInstance().isAuthenticated();

    }

    public static getInstance(): GameController {
        if (!GameController.instance) {
            GameController.instance = new GameController();
        }
        return GameController.instance;
    }


    public async searchGameByName(name: string): Promise<any> {
        let game = await gameAPI.fetchGameByName(name);
        return game;
    }

    public async sendReview(gameName: string, event: any) {

        const formData = new FormData(event.currentTarget);
        const playStatus = formData.get("playStatus");
        const plataforma = formData.get("plataform");
        const nota = formData.get("nota");
        const review = formData.get("review");
    }

    public async changePlayStatus(playStatus: PlayStatus) {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para alterar o status do jogo.");
            return;
        }

        try {
            //await gameAPI.changePlayStatus(gameName, playStatus);
            toast.success("Status do jogo alterado com sucesso!" + playStatus);
        } catch (error) {
            console.error("Erro ao alterar o status do jogo:", error);
            toast.error("Erro ao alterar o status do jogo. Tente novamente mais tarde.");
        }
    }

    public async changeGameRating(gameName: string, rating: number) {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para avaliar o jogo.");
            return;
        }

        try {
            //await gameAPI.changeGameRating(gameName, rating);
            toast.success("Avaliação do jogo alterada com sucesso!");
        } catch (error) {
            console.error("Erro ao alterar a avaliação do jogo:", error);
            toast.error("Erro ao alterar a avaliação do jogo. Tente novamente mais tarde.");
        }
    }

}
