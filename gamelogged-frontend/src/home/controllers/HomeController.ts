

import { gameAPI } from '../../services/APIService';
import { AuthController } from '@/authentication/controllers/AuthController';

export class HomeController {
    private static instance: HomeController;
    public isAuthenticated: boolean = false;

    private constructor() { 
        this.isAuthenticated = AuthController.getInstance().isAuthenticated();
    }

    public static getInstance(): HomeController {
        if (!HomeController.instance) {
            HomeController.instance = new HomeController();
        }
        return HomeController.instance;
    }

    public async fetchGames(limit: number, offset: number, activeSearch: string): Promise<any> {
        if (activeSearch) {
            return await gameAPI.searchGameListByName(activeSearch, limit, offset);
        }
        return await gameAPI.fetchPaginatedGames(limit, offset);
    }

}