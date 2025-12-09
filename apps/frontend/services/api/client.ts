import axios from 'axios';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import jwtDecode from 'jwt-decode';

import { env } from 'services/env';
import { CustomError } from 'services/errors/custom-error';
import { isNetworkError } from 'services/errors/network-error';

import { ApiRoutes } from './apiRoutes';
import {
  getAccessFromResponse,
  getAccessToken,
  isTokenExpired,
  removeAccessToken,
  setAccessToken,
} from './auth/utils';

export const apiBaseUrl = env('NEXT_PUBLIC_API_BASE_URL');

// Request timeout: 30 seconds
const REQUEST_TIMEOUT_MS = 30000;

// Circuit breaker to prevent refresh retry loops
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const access = getAccessToken();
    if (access === null) {
      throw new CustomError('authentication', 'no-token');
    }
    if (isTokenExpired(jwtDecode(access))) {
      // Wait for any ongoing refresh to complete
      if (refreshPromise) {
        await refreshPromise;
      } else {
        await refreshToken();
      }
    }

    const updatedAccess = getAccessToken();
    if (updatedAccess === null) {
      throw new CustomError('authentication', 'no-token');
    }

    return {
      ...config,
      headers: Object.assign(config.headers, {
        Authorization: `Bearer ${updatedAccess}`,
      }),
    };
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
  // Prevent concurrent refresh attempts
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  const options: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };

  refreshPromise = (async () => {
    try {
      const response = await apiClient.post<unknown>(
        ApiRoutes.refresh,
        undefined,
        options,
      );
      setAccessToken(getAccessFromResponse(response));
      isRefreshing = false;
      refreshPromise = null;
    } catch (error) {
      isRefreshing = false;
      refreshPromise = null;

      // If refresh fails, clear auth state to prevent loops with stale cookies
      // This handles:
      // - Invalid/expired refresh token cookie
      // - Network errors (backend down, DNS issues)
      // - Any other refresh failures
      await clearAuthState();

      // For network errors, throw a network error (not auth error)
      // This allows SWR to handle it properly (no retry)
      if (isNetworkError(error)) {
        return Promise.reject(error);
      }

      // For auth errors (invalid token), throw auth error
      return Promise.reject(new CustomError('authentication', 'invalid-token'));
    }
  })();

  return refreshPromise;
};

createAuthRefreshInterceptor(apiClient, async () => await refreshToken(), {
  statusCodes: [401],
});
