import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import defaultImage from '@/images/default.jpg';

const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/validarLogin`,
    CADASTRO: `${API_BASE_URL}/auth/cadastro`,
    USER_BY_TOKEN: `${API_BASE_URL}/user/findByToken`,
    USER: `${API_BASE_URL}/user/current`,
    CREATE_REVIEW: `${API_BASE_URL}/review/create`,
    ALTER_PLAY_STATUS: `${API_BASE_URL}/game-interaction/update`,
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
    },

    searchGameListByName: async (gameName: string, limit: number, offset: number) => {
        const response = await fetch(`http://localhost:8080/game/igdb/search?name=${encodeURIComponent(gameName)}&limit=${limit}&offset=${offset}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to search games by name from IGDB");
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
    },

    fetchGameByName: async (name: string) => {
        const response = await fetch(`http://localhost:8080/game/igdb/${encodeURIComponent(name)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch game details from IGDB");
        }
        const game = await response.json();
        return {
            id: game.id,
            name: game.name,
            coverUrl: game.cover?.url,
            firstReleaseDate: game.first_release_date,
            platforms: game.platforms?.map((platform: any) => platform.name),
            summary: game.summary,
            genres: game.genres?.map((genre: any) => genre.name),
            screenshot: game.single_screenshot_url
        };
    },

    createReview: async (gameId: number, reviewData: any) => {
        await APIService.getInstance().request(API_ENDPOINTS.CREATE_REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
            body: JSON.stringify({ reviewData, gameId }),
        })
    },

    changePlayStatus: async (gameId: number, playStatus: string) => {
        const response = await fetch(`http://localhost:8080/game-interaction/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
            body: JSON.stringify({ gameId, playStatus }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    },

    getPlayStatus: async (gameId: number) => {
        const response = await fetch(`http://localhost:8080/game-interaction/status/${gameId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    },

    sendReview: async (reviewData: any) => {
        const response = await fetch(API_ENDPOINTS.CREATE_REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            throw new Error(`Failed to send review: ${response.statusText}`);
        }
        return await response.json();

    }
};