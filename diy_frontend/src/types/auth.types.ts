// Типы для регистрации
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

// Типы для входа
export interface LoginData {
  email: string;
  password: string;
}

// Ответ от сервера при входе
export interface LoginResponse {
  access: string;
  refresh: string;
  user?: User;
}

// Пользователь
export interface User {
  id: string | number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_verified?: boolean;
  is_instructor?: boolean;
  profile_image?: string;
  created_at?: string;
  updated_at?: string;
}

// Контекст аутентификации
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Ошибки API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}