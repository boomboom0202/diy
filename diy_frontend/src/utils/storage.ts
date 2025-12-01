// Утилиты для работы с localStorage

export const storage = {
  // Токены
  setAccessToken: (token: string): void => {
    localStorage.setItem('access_token', token);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  removeAccessToken: (): void => {
    localStorage.removeItem('access_token');
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem('refresh_token', token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refresh_token');
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem('refresh_token');
  },

  clearAuthTokens: (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Проверка авторизации
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },

  // Общие методы
  setItem: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  },

  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },

  // Для работы с JSON
  setJSON: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getJSON: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },
};