import { useState } from 'react';
import { AuthController } from '@/controllers/AuthController';
import type { LoginCredentials, RegisterData } from '@/types/auth';

export class AuthViewModel {
  private authController: AuthController;

  constructor() {
    this.authController = AuthController.getInstance();
  }

  public useLoginViewModel() {
    const [formData, setFormData] = useState<LoginCredentials>({
      email: '',
      password: ''
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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await this.authController.login(formData);
        console.log('Login realizado com sucesso');
        return true;
      } catch (error: any) {
        setError(error.message);
        return false;
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

  public useRegisterViewModel() {
    const [formData, setFormData] = useState<RegisterData & { confirmPassword: string }>({
      email: '',
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
        await this.authController.register(formData);
        console.log('Cadastro realizado com sucesso');
        clearForm();
        onSuccess?.();
        return true;
      } catch (error: any) {
        setError(error.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    const clearForm = () => {
      setFormData({ email: '', password: '', confirmPassword: '' });
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

  public isAuthenticated(): boolean {
    return this.authController.isAuthenticated();
  }

  public getCurrentUser() {
    return this.authController.getCurrentUser();
  }

  public logout(): void {
    this.authController.logout();
  }
}
