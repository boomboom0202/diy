import { useCallback } from 'react';
import { authService } from '../api/services/auth.service';
import type { RegisterData } from '../types/auth.types';

export const useAuth = () => {
  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await authService.register({
        email: data.email,
        username: data.username,
        password: data.password,
        password2: data.password2,
        first_name: data.first_name,
        last_name: data.last_name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  return { register };
};