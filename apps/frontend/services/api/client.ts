import axios from 'axios';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';

import { env } from 'services/env';
import { CustomError } from 'services/errors/custom-error';
import { isNetworkError } from 'services/errors/network-error';

import { ApiRoutes } from './apiRoutes';
import {
  getAccessFromResponse,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from './auth/utils';

export const apiBaseUrl = env('NEXT_PUBLIC_API_BASE_URL');

// Request timeout: 30 seconds
const REQUEST_TIMEOUT_MS = 30000;

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor that adds the Bearer token to requests.
 * 
 * This interceptor has a focused responsibility: add the authorization header.
 * Token verification and refresh logic is handled by:
 * - AuthContext: Verifies tokens before fetching user data
 * - axios-auth-refresh: Handles 401 responses and token refresh
 */
apiClient.interceptors.request.use(
  config => {
    const access = getAccessToken();
    
    // If there's a token, add it to the Authorization header
    if (access !== null) {
      return {
        ...config,
        headers: Object.assign(config.headers, {
          Authorization: `Bearer ${access}`,
        }),
      };
    }

    // No token available - let the request proceed
    // Server will return 401 if auth is required
    return config;
  },
  undefined,
  {
    runWhen: config =>
      config.url !== ApiRoutes.refresh &&
      config.url !== ApiRoutes.login &&
      config.url !== ApiRoutes.logout,
  },
);

/**
 * Clears authentication state (localStorage + cookie via logout endpoint)
 * This is called when refresh fails to prevent infinite loops with stale cookies
 */
const clearAuthState = async (): Promise<void> => {
  // Clear localStorage immediately
  removeAccessToken();

  // Try to clear the refresh token cookie via logout endpoint
  // Use a separate axios instance to avoid interceptor loops
  const logoutClient = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
    timeout: 5000, // Shorter timeout for logout
  });

  try {
    await logoutClient.post<unknown>(ApiRoutes.logout);
  } catch {
    // Ignore errors - cookie might already be cleared or server unreachable
    // The important part is we cleared localStorage
  }
};

const refreshToken = async (): Promise<void> => {
  const options: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };

  try {
    const response = await apiClient.post<unknown>(
      ApiRoutes.refresh,
      undefined,
      options,
    );
    setAccessToken(getAccessFromResponse(response));
  } catch (error) {
    // If refresh fails, clear auth state to prevent loops with stale cookies
    // This handles:
    // - Invalid/expired refresh token cookie
    // - Network errors (backend down, DNS issues)
    // - Any other refresh failures
    await clearAuthState();

    // For network errors, throw a network error (not auth error)
    // This allows SWR to handle it properly (no retry)
    if (isNetworkError(error)) {
      throw error;
    }

    // For auth errors (invalid token), throw auth error
    throw new CustomError('authentication', 'invalid-token');
  }
};

createAuthRefreshInterceptor(apiClient, async () => await refreshToken(), {
  statusCodes: [401],
});
