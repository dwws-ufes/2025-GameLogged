export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    nickname: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface ApiError {
    message: string;
    status: number;
}
