import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';
import type { 
  RegisterData, 
  LoginData, 
  LoginResponse, 
  User 
} from '../../types/auth.types';

export const authService = {
  // Регистрация нового пользователя
  register: async (data: RegisterData) => {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  // Вход
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
    
    // Сохраняем токены в localStorage
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
    }
    if (response.data.refresh) {
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    
    return response.data;
  },

  // Выход
  logout: async () => {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } finally {
      // Очищаем токены в любом случае
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  // Получение данных текущего пользователя
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  // Подтверждение email
  verifyEmail: async (token: string) => {
    const response = await apiClient.get(AUTH_ENDPOINTS.VERIFY_EMAIL(token));
    return response.data;
  },

  // Повторная отправка письма для подтверждения
  resendVerification: async () => {
    const response = await apiClient.post(AUTH_ENDPOINTS.RESEND_VERIFICATION);
    return response.data;
  },
};