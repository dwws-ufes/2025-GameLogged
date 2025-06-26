export class AuthStateService {
  private static readonly TOKEN_KEY: string = "auth_token";

  public static setAuthData(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public static clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}