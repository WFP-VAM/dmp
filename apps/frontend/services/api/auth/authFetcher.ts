import { apiClient } from '../client';

/**
 * Custom fetcher for authentication endpoints used by AuthContext.
 * 
 * Token verification is now handled by AuthContext through this fetcher:
 * 1. The axios interceptor adds the Bearer token (simple, focused responsibility)
 * 2. This fetcher makes the request to fetch user data
 * 3. If the token is expired/invalid, server returns 401
 * 4. axios-auth-refresh intercepts the 401 and refreshes the token automatically
 * 5. The request is retried with the new token
 * 6. AuthContext receives the user data or an error
 * 
 * This approach:
 * - Keeps interceptors focused on adding headers
 * - Moves authentication state management to AuthContext
 * - Avoids complex redirection logic in interceptors
 * - Relies on server-side validation (more secure and simpler)
 */
export const authFetcher = async (url: string) => {
  // Make the request - the axios interceptor will add the Bearer token if available
  // If the token is expired/invalid, axios-auth-refresh will handle the 401 and retry
  const response = await apiClient.get<unknown>(url);
  return response.data;
};
