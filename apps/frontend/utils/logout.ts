import { NextRouter } from 'next/router';

import { ApiRoutes } from 'services/api/apiRoutes';
import { removeAccessToken } from 'services/api/auth/utils';
import { apiClient } from 'services/api/client';

/**
 * Logs out the user by:
 * 1. Clearing localStorage (access token)
 * 2. Calling logout endpoint to clear refresh token cookie (fire and forget)
 * 3. Redirecting to login page (hard redirect clears all state)
 */
export const logout = (router?: NextRouter): void => {
  // Clear localStorage immediately
  removeAccessToken();

  // Fire logout endpoint to clear refresh token cookie
  // Don't await - hard redirect will happen immediately
  // The interceptor skips this endpoint (see runWhen in client.ts)
  void apiClient.post<unknown>(ApiRoutes.logout).catch(() => {
    // Ignore errors - cookie might already be cleared or server unreachable
  });

  // Hard redirect immediately - this clears all React state, SWR cache, etc.
  // No need to manually clear cache since hard redirect does it
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  } else if (router) {
    void router.push('/login');
  }
};
