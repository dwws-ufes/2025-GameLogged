import { gameAPI } from "@/services/APIService";

 export class GameController {
   private static instance: GameController;
   
   public static getInstance(): GameController {
     if (!GameController.instance) {
       GameController.instance = new GameController();
     }
     return GameController.instance;
   }


   public async searchGameByName(name: string): Promise<any> {
        return await gameAPI.fetchGameByName(name); 
   }

   
 }