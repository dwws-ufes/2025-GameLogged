import type { LoginCredentials, RegisterData} from '@/types/auth';

export class AuthValidationService {
  public static validateEmail(email: string): { isValid: boolean; message?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      return { isValid: false, message: 'Email é obrigatório' };
    }
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email inválido' };
    }
    
    return { isValid: true };
  }

  public static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (!password) {
      return { isValid: false, message: 'Senha é obrigatória' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }
    
    return { isValid: true };
  }

  public static validatePasswordMatch(password: string, confirmPassword: string): { isValid: boolean; message?: string } {
    if (password !== confirmPassword) {
      return { isValid: false, message: 'As senhas não coincidem' };
    }
    
    return { isValid: true };
  }

  public static validateLoginCredentials(credentials: LoginCredentials): { isValid: boolean; message?: string } {
    const emailValidation = this.validateEmail(credentials.email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const passwordValidation = this.validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }

    return { isValid: true };
  }

  public static validateRegisterData(data: RegisterData & { confirmPassword: string }): { isValid: boolean; message?: string } {
    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const passwordValidation = this.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }

    const passwordMatchValidation = this.validatePasswordMatch(data.password, data.confirmPassword);
    if (!passwordMatchValidation.isValid) {
      return passwordMatchValidation;
    }

    return { isValid: true };
  }
}

