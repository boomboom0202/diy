// API Endpoints Constants

// Auth endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/v1/register/',
  LOGIN: '/auth/v1/login/',
  LOGOUT: '/auth/v1/logout/',
  ME: '/auth/v1/me/',
  VERIFY_EMAIL: (token: string) => `/auth/v1/verify-email/${token}/`,
  RESEND_VERIFICATION: '/auth/v1/resend-verification/',
  // Для будущего
  REFRESH_TOKEN: '/auth/v1/token/refresh/',
  FORGOT_PASSWORD: '/auth/v1/forgot-password/',
  RESET_PASSWORD: '/auth/v1/reset-password/',
};

// Users endpoints
export const USERS_ENDPOINTS = {
  LIST: '/users/',
  DETAIL: (id: string | number) => `/users/${id}/`,
  UPDATE_PROFILE: '/users/profile/',
  CHANGE_PASSWORD: '/users/change-password/',
  DELETE_ACCOUNT: '/users/delete-account/',
};

// Instructors endpoints
export const INSTRUCTORS_ENDPOINTS = {
  LIST: '/instructors/',
  DETAIL: (id: string | number) => `/instructors/${id}/`,
  CREATE: '/instructors/',
  UPDATE: (id: string | number) => `/instructors/${id}/`,
  DELETE: (id: string | number) => `/instructors/${id}/`,
};

// Skills endpoints
export const SKILLS_ENDPOINTS = {
  LIST: '/skills/',
  DETAIL: (id: string | number) => `/skills/${id}/`,
  CREATE: '/skills/',
  UPDATE: (id: string | number) => `/skills/${id}/`,
  DELETE: (id: string | number) => `/skills/${id}/`,
};

// Bookings endpoints
export const BOOKINGS_ENDPOINTS = {
  LIST: '/bookings/',
  MY_BOOKINGS: '/bookings/my/',
  DETAIL: (id: string | number) => `/bookings/${id}/`,
  CREATE: '/bookings/',
  UPDATE: (id: string | number) => `/bookings/${id}/`,
  CANCEL: (id: string | number) => `/bookings/${id}/cancel/`,
};

// Reviews endpoints
export const REVIEWS_ENDPOINTS = {
  LIST: '/reviews/',
  DETAIL: (id: string | number) => `/reviews/${id}/`,
  CREATE: '/reviews/',
  UPDATE: (id: string | number) => `/reviews/${id}/`,
  DELETE: (id: string | number) => `/reviews/${id}/`,
};

// Payments endpoints
export const PAYMENTS_ENDPOINTS = {
  LIST: '/payments/',
  DETAIL: (id: string | number) => `/payments/${id}/`,
  CREATE: '/payments/',
  VERIFY: '/payments/verify/',
};

// Messaging endpoints
export const MESSAGING_ENDPOINTS = {
  CONVERSATIONS: '/messaging/conversations/',
  MESSAGES: (conversationId: string | number) => `/messaging/conversations/${conversationId}/messages/`,
  SEND: '/messaging/send/',
};