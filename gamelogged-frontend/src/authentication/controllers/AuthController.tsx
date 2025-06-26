import { authAPI, userAPI } from '@/services/APIService';
import type { LoginCredentials, RegisterData, AuthResponse } from '../dto/auth';
import { AuthValidationService} from '@/authentication/services/AuthValidationService';
import { AuthStateService } from '@/authentication/services/AuthStateService';

export class AuthController {
  private static instance: AuthController;

  private constructor() {}

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  public async login(credentials: LoginCredentials): Promise<void> {
    const validation = AuthValidationService.validateLoginCredentials(credentials);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    try {
      const token = await authAPI.login(credentials);
      AuthStateService.setAuthData(token);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Credenciais inválidas');
    }
  }

  public async register(userData: RegisterData & { confirmPassword: string }): Promise<void> {
    const validation = AuthValidationService.validateRegisterData(userData);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    try {
      await authAPI.cadastro({
        email: userData.email,
        password: userData.password,
        nickname: userData.nickname
      });
    } catch (error) {
      throw new Error('Erro ao criar conta. Email pode já estar em uso.');
    }
  }

  public logout(): void {
    try {
      AuthStateService.clearAuthData();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  public isAuthenticated(): boolean {
    return AuthStateService.isAuthenticated();
  }

  public getToken(): string | null {
    return AuthStateService.getToken();
  }

  public async getUserNickname(): Promise<string | null> {
    const token = AuthStateService.getToken();
   
    if (!token) {
      return null;
    }

    const response = await userAPI.getCurrentUser();

    return response && response.nickname ? response.nickname : null;


  }

}