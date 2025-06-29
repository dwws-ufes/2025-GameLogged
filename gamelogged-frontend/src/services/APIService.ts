import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import defaultImage from '@/images/default.jpg';

const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/validarLogin`,
    CADASTRO: `${API_BASE_URL}/auth/cadastro`,
    USER_BY_TOKEN: `${API_BASE_URL}/user/findByToken`,
    USER: `${API_BASE_URL}/user/current`,
};


export class APIService {
    private static instance: APIService;

    private constructor() { }

    public static getInstance(): APIService {
        if (!APIService.instance) {
            APIService.instance = new APIService();
        }
        return APIService.instance;
    }

    public async request(endpoint: string, options: RequestInit = {}): Promise<any> {
        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(endpoint, defaultOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }
}

export const authAPI = {
    login: async (credentials: { email: string; password: string }) => {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);  
        const idToken = await userCredential.user.getIdToken();
        await APIService.getInstance().request(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
        });

        return idToken;
    },

    cadastro: async (userData: { email: string; password: string, nickname: string }) => {
        return await APIService.getInstance().request(API_ENDPOINTS.CADASTRO, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
};

export const userAPI = {

    getCurrentUser: async () => {
        return await APIService.getInstance().request(API_ENDPOINTS.USER, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
        });
    },

    getUserByToken: async (token: string) => {
        return await APIService.getInstance().request(API_ENDPOINTS.USER_BY_TOKEN, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },
};

export const gameAPI = {

    fetchPaginatedGames: async (limit: number, offset: number) => {
        const response = await fetch(`http://localhost:8080/game/igdb/paginated?limit=${limit}&offset=${offset}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch games from IGDB");
        }
    
        const data = await response.json();
        return data.map((game: any) => ({
          id: game.id,
          name: game.name,
          coverUrl: game.cover?.url
            ? `https:${game.cover.url.replace('t_thumb', 't_cover_big_2x')}`
            : defaultImage,
            hasCover: !!game.cover,
        }));
    }
}