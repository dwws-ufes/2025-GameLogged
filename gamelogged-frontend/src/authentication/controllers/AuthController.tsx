import { authAPI } from '@/services/APIService';
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

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const validation = AuthValidationService.validateLoginCredentials(credentials);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    try {
      const response = await authAPI.login(credentials);
      AuthStateService.setAuthData(response);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Credenciais inválidas');
    }
  }

  public async register(userData: RegisterData & { confirmPassword: string }): Promise<AuthResponse> {
    const validation = AuthValidationService.validateRegisterData(userData);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    try {
      const response = await authAPI.cadastro({
        email: userData.email,
        password: userData.password
      });
      return response;
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

  public getCurrentUser(): any | null {
    return AuthStateService.getUser();
  }

  public getToken(): string | null {
    return AuthStateService.getToken();
  }
}