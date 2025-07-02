import { authAPI, userAPI } from '@/services/APIService';
import type { LoginCredentials, RegisterData } from '../dto/auth';
import { AuthValidationService } from '@/authentication/services/AuthValidationService';
import { AuthStateService } from '@/authentication/services/AuthStateService';
import { useState } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';

export class AuthController {
  private static instance: AuthController;

  private constructor() { }

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

    try {
      const response = await userAPI.getCurrentUser();
      return response && response.nickname ? response.nickname : null;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        window.location.href = '/';
      }
      return null;
    }


  }

  public async uploadProfilePicture(file: File, userId: string): Promise<string> {
    const storage = getStorage();

    const storageRef = ref(storage, `profile_pictures/${userId}/avatar.jpg`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  public static useLoginForm() {
    const [formData, setFormData] = useState<LoginCredentials>({
      email: '',
      password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await AuthController.getInstance().login(formData);
        console.log('Login realizado com sucesso');
        toast.success("Login realizado com sucesso", {
          description: "Você será redirecionado para a página principal."
        });
        navigate("/home");
      } catch (error: any) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const clearForm = () => {
      setFormData({ email: '', password: '' });
      setError(null);
    };

    return {
      formData,
      isLoading,
      error,
      handleInputChange,
      handleSubmit,
      clearForm
    };
  }

  public static useRegisterForm() {
    const [formData, setFormData] = useState<RegisterData & { confirmPassword: string }>({
      email: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await AuthController.getInstance().register(formData);
        console.log('Cadastro realizado com sucesso');
        clearForm();
        toast.success("Cadastro realizado com sucesso", {
          description: "Faça o login para continuar."
        });
        onSuccess?.();
      } catch (error: any) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const clearForm = () => {
      setFormData({ email: '', password: '', confirmPassword: '', nickname: '' });
      setError(null);
    };

    return {
      formData,
      isLoading,
      error,
      handleInputChange,
      handleSubmit,
      clearForm
    };
  }



}