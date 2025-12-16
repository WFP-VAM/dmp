import jwtDecode, { JwtPayload } from 'jwt-decode';

import { apiClient } from '../client';
import { getAccessToken, isTokenExpired, removeAccessToken } from './utils';

/**
 * Custom fetcher for authentication endpoints that verifies tokens before making requests.
 * This is used specifically by AuthContext to ensure tokens are valid before fetching user data.
 * 
 * The token verification logic is moved here from the axios interceptor to:
 * 1. Keep interceptors focused on their core purpose (adding headers)
 * 2. Handle authentication state management in AuthContext where it belongs
 * 3. Avoid complex redirection logic in interceptors
 */
export const authFetcher = async (url: string) => {
  const access = getAccessToken();
  
  // If there's a token, validate it before making the request
  if (access !== null) {
    // Validate and decode token safely
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwtDecode<JwtPayload>(access);
    } catch {
      // Invalid token format - clear it and let the request proceed
      // The server will return 401, which AuthContext will handle by redirecting to login
      removeAccessToken();
    }

    // Check if token is expired
    if (decodedToken && isTokenExpired(decodedToken)) {
      // Clear the expired token
      // The request will be made without a token, server returns 401
      // The axios-auth-refresh interceptor will attempt to refresh using the refresh token cookie
      removeAccessToken();
    }
  }

  // Make the request - the axios interceptor will add the Bearer token if available
  // If the token is expired/invalid, axios-auth-refresh will handle the 401 and retry
  const response = await apiClient.get<unknown>(url);
  return response.data;
};
