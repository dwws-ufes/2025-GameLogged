import type { AuthResponse } from "../dto/auth";

export class AuthStateService {
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly USER_KEY = 'user';

  public static setAuthData(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
  }

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public static getUser(): any | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  public static clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}