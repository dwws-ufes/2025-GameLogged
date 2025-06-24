const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    CADASTRO: `${API_BASE_URL}/auth/cadastro`,
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
        return APIService.getInstance().request(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    cadastro: async (userData: { email: string; password: string }) => {
        return APIService.getInstance().request(API_ENDPOINTS.CADASTRO, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
};
