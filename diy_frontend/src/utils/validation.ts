// Утилиты валидации

export const validation = {
  // Username валидация (буквы, цифры, подчеркивание, 3-20 символов)
  username: (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  },

  // Email валидация
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Пароль (минимум 8 символов)
  password: (password: string): boolean => {
    return password.length >= 8;
  },

  // Сильный пароль (минимум 8 символов, буквы и цифры)
  strongPassword: (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return strongPasswordRegex.test(password);
  },

  // Телефон (базовая валидация)
  phone: (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  // Проверка на пустое значение
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  // Минимальная длина
  minLength: (value: string, length: number): boolean => {
    return value.length >= length;
  },

  // Максимальная длина
  maxLength: (value: string, length: number): boolean => {
    return value.length <= length;
  },

  // Только буквы
  onlyLetters: (value: string): boolean => {
    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);
  },

  // Только цифры
  onlyNumbers: (value: string): boolean => {
    return /^\d+$/.test(value);
  },

  // URL
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// Функции для получения сообщений об ошибках
export const getErrorMessage = {
  username: (): string => 'Username должен содержать 3-20 символов (буквы, цифры, _)',
  email: (): string => 'Некорректный email адрес',
  password: (): string => 'Пароль должен содержать минимум 8 символов',
  strongPassword: (): string => 'Пароль должен содержать минимум 8 символов, буквы и цифры',
  phone: (): string => 'Некорректный номер телефона',
  required: (field: string): string => `${field} обязательно для заполнения`,
  minLength: (field: string, length: number): string => `${field} должно содержать минимум ${length} символов`,
  maxLength: (field: string, length: number): string => `${field} должно содержать максимум ${length} символов`,
  passwordMatch: (): string => 'Пароли не совпадают',
};