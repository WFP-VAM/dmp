export const ApiRoutes = {
  logout: '/auth/jwt/logout',
  login: '/auth/jwt/create',
  lastForms: '/kobo/last-forms/10',
  refresh: '/auth/jwt/refresh',
  me: '/users/me',
  users: '/users/',
} as const;
