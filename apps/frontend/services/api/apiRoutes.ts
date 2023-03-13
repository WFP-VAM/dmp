export const ApiRoutes = {
  logout: '/auth/jwt/logout',
  login: '/auth/jwt/create',
  kobo: '/kobo/10',
  refresh: '/auth/jwt/refresh',
  me: '/users/me',
  users: '/users/',
} as const;
