import { NUMBER_LAST_DAYS } from 'constant';

export const ApiRoutes = {
  logout: '/auth/jwt/logout',
  login: '/auth/jwt/create',
  lastForms: `/kobo/last-forms/${NUMBER_LAST_DAYS}`,
  forms: '/kobo/forms',
  form: '/kobo/form',
  refresh: '/auth/jwt/refresh',
  me: '/users/me',
  users: '/users/',
} as const;
