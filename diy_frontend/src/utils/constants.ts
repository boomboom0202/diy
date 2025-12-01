// Константы приложения

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'DIY Platform';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Роуты
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  BOOKINGS: '/bookings',
  INSTRUCTORS: '/instructors',
  SKILLS: '/skills',
  MESSAGES: '/messages',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

// Ключи localStorage
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
} as const;

// Статусы
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Сообщения
export const MESSAGES = {
  LOGIN_SUCCESS: 'Вход выполнен успешно',
  LOGIN_ERROR: 'Ошибка входа. Проверьте email и пароль',
  REGISTER_SUCCESS: 'Регистрация успешна! Проверьте email',
  REGISTER_ERROR: 'Ошибка регистрации',
  LOGOUT_SUCCESS: 'Выход выполнен',
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение',
  UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
} as const;