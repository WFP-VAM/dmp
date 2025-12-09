import { SWRConfiguration } from 'swr';

import { shouldNotRetry } from '../errors/network-error';
import { apiClient } from './client';

/**
 * Default SWR configuration for the application.
 *
 * Why custom error handling is needed:
 * - SWR retries ALL errors by default (including network/DNS failures)
 * - This causes infinite loading loops when backend is unreachable
 * - We need to distinguish between retryable (5xx) and non-retryable (network, 4xx) errors
 *
 * SWR's philosophy is "stale-while-revalidate" - optimistic retries work great
 * for transient issues but fail badly for permanent infrastructure problems.
 */
export const defaultSWRConfig: SWRConfiguration = {
  refreshInterval: 0, // Disable auto refresh by interval by default
  fetcher: (resource: string) =>
    apiClient.get<unknown>(resource).then(response => response.data),
  // eslint-disable-next-line max-params
  onErrorRetry: (
    error: unknown,
    _key: string,
    _config: SWRConfiguration,
    revalidate: (options?: { retryCount?: number }) => void,
    { retryCount }: { retryCount: number },
  ) => {
    // Don't retry on network errors or client errors (4xx)
    // These indicate permanent failures that won't resolve with retries
    if (shouldNotRetry(error)) {
      return;
    }

    // SWR's default: retry up to 3 times with exponential backoff
    // We limit to 2 retries for faster failure feedback
    if (retryCount >= 2) {
      return;
    }

    // Use SWR's default exponential backoff formula
    // delay = min(1000 * (2 ^ retryCount), 10000)
    const delay = Math.min(1000 * 2 ** retryCount, 10000);
    setTimeout(() => revalidate({ retryCount }), delay);
  },
};
