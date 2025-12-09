import { NextRouter } from 'next/router';
import { mutate } from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { removeAccessToken } from 'services/api/auth/utils';
import { apiClient } from 'services/api/client';

/**
 * Logs out the user by:
 * 1. Clearing localStorage (access token)
 * 2. Clearing SWR cache
 * 3. Calling logout endpoint to clear refresh token cookie
 * 4. Redirecting to login page
 */
export const logout = async (router?: NextRouter) => {
  // Clear localStorage immediately
  removeAccessToken();

  // Clear SWR cache - invalidate all cached data
  void mutate(() => true, undefined, { revalidate: false });
  // Specifically invalidate the /api/me endpoint to prevent cached user data
  void mutate(ApiRoutes.me, undefined, { revalidate: false });

  try {
    // Clear refresh token cookie via logout endpoint
    // The interceptor skips this endpoint (see runWhen in client.ts)
    // so it works even after clearing localStorage
    await apiClient.post<unknown>(ApiRoutes.logout);
  } catch {
    // Ignore errors - cookie might already be cleared or server unreachable
    // The important part is we cleared localStorage and cache
  }

  // Redirect to login page
  // Use window.location for a hard redirect to ensure all state is cleared
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  } else if (router) {
    void router.push('/login');
  }
};
