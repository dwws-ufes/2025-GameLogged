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

    public async sendReview(gameId: number, event: any, isReviewed: boolean = false) : Promise<boolean>{

        const reviewData = {
            gameId: Number(gameId),
            playStatus: event.playStatus,
            platform: event.plataform,
            rating: event.nota,
            reviewText: event.review,
            playTimeInHours: event.timePlayed,
        };

        if(reviewData.playStatus === "NONE" || reviewData.playStatus === "WISHLIST" ){
            toast.error("É necessário ter experienciado o jogo para avaliar.");
            return true;
        }


        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para enviar uma review.");
            return false;
        }

        if (!isReviewed) {
            try {
                await gameAPI.sendReview(reviewData);
                toast.success("Review enviada com sucesso!");
                return false;
            } catch (error) {
                console.error("Erro ao enviar a review:", error);
                toast.error("Erro ao enviar a review. Tente novamente mais tarde.");
                return true;
            }
        } else {
            try {
                await gameAPI.updateReview(reviewData);
                toast.success("Review atualizada com sucesso!");
                return false;
            } catch (error) {
                console.error("Erro ao enviar a review:", error);
                toast.error("Erro ao enviar a review. Tente novamente mais tarde.");
                return true;
            }
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

    public async getReviews(gameId: number): Promise<any[]> {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para ver as reviews do jogo.");
            return [];
        }

        try {
            const reviews = await gameAPI.getReviews(gameId);
            console.log("Reviews obtidas:", reviews);
            return reviews;
        } catch (error) {
            console.error("Erro ao obter as reviews do jogo:", error);
            toast.error("Erro ao obter as reviews do jogo. Tente novamente mais tarde.");
            return [];
        }
    }


    public async getRatings(gameId: number): Promise<any[]> {
        if (!this.isUserAuthenticated) {
            toast.error("Você precisa estar logado para ver as avaliações do jogo.");
            return [];
        }

        try {
            const ratings = await gameAPI.getGameRating(gameId);
            console.log("Avaliações obtidas:", ratings);
            return ratings;
        } catch (error) {
            console.error("Erro ao obter as avaliações do jogo:", error);
            toast.error("Erro ao obter as avaliações do jogo. Tente novamente mais tarde.");
            return [];
        }
    }

}
