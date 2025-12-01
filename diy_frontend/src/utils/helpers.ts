// Вспомогательные функции

import type { AxiosError } from 'axios';

// Обработка ошибок API
export const handleApiError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as AxiosError<any>;
    
    // Проверяем наличие сообщения об ошибке
    if (axiosError.response?.data?.detail) {
      return axiosError.response.data.detail;
    }
    
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    
    // Обработка ошибок валидации
    if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
      const errors = Object.values(axiosError.response.data);
      if (errors.length > 0) {
        const firstError = errors[0];
        return Array.isArray(firstError) ? firstError[0] : String(firstError);
      }
    }
    
    // Общие HTTP ошибки
    if (axiosError.response?.status) {
      switch (axiosError.response.status) {
        case 400:
          return 'Неверные данные запроса';
        case 401:
          return 'Необходима авторизация';
        case 403:
          return 'Доступ запрещен';
        case 404:
          return 'Ресурс не найден';
        case 500:
          return 'Ошибка сервера';
        default:
          return `Ошибка: ${axiosError.response.status}`;
      }
    }
  }
  
  return 'Произошла неизвестная ошибка';
};

// Форматирование даты
export const formatDate = (date: string | Date, format: 'short' | 'long' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('ru-RU');
  }
  
  return dateObj.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Дебаунс функция
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Троттлинг функция
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Генерация инициалов из имени
export const getInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.charAt(0).toUpperCase() || '';
  const last = lastName?.charAt(0).toUpperCase() || '';
  return first + last || '?';
};

// Получение полного имени
export const getFullName = (firstName?: string, lastName?: string): string => {
  return [firstName, lastName].filter(Boolean).join(' ') || 'Пользователь';
};

// Проверка на пустой объект
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

// Копирование в буфер обмена
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Генерация случайной строки
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Задержка (для тестирования)
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};