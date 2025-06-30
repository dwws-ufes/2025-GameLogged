import { AuthController } from "@/authentication/controllers/AuthController";
import { gameAPI } from "@/services/APIService";
import { toast } from "sonner";

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

}
