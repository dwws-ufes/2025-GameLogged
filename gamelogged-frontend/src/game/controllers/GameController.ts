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

    public async sendReview(gameId : number, event: any) {

        const reviewData = {
            gameId: Number(gameId),
            playStatus : event.playStatus,
            platform : event.plataform,
            rating: event.nota,
            reviewText: event.review,
            playTimeInHours : event.timePlayed,
        };


        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para enviar uma review.");
            return;
        }

        try {
            await gameAPI.sendReview(reviewData);
            toast.success("Review enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar a review:", error);
            toast.error("Erro ao enviar a review. Tente novamente mais tarde.");
        }


    }

    public async changePlayStatus(gameId: number, playStatus: PlayStatus) {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para alterar o status do jogo.");
            return;
        }
        try {
            await gameAPI.changePlayStatus(gameId, playStatus);
            toast.success("Status do jogo alterado com sucesso!");
        } catch (error) {
            console.error("Erro ao alterar o status do jogo:", error);
            toast.error("Erro ao alterar o status do jogo. Tente novamente mais tarde.");
        }
    }
 

    public async getPlayStatus(gameId: number): Promise<PlayStatus> {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para ver o status do jogo.");
            return "NONE";
        }
        
        try {
            const playStatus = await gameAPI.getPlayStatus(gameId);
            return playStatus as PlayStatus;
        } catch (error) {
            console.error("Erro ao obter o status do jogo:", error);
            toast.error("Erro ao obter o status do jogo. Tente novamente mais tarde.");
            return "NONE";
        }
    }

}
