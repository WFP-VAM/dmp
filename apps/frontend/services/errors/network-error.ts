import { AxiosError, isAxiosError } from 'axios';

/**
 * Network error codes that indicate the backend is unreachable
 */
const NETWORK_ERROR_CODES = [
  'ECONNABORTED', // Request timeout
  'ETIMEDOUT', // Connection timeout
  'ENOTFOUND', // DNS resolution failure
  'ECONNREFUSED', // Connection refused
] as const;

/**
 * Checks if an error is a network error (backend unreachable, timeout, DNS issues, etc.)
 * These errors should not trigger retries as they indicate infrastructure issues.
 */
export const isNetworkError = (error: unknown): boolean => {
  if (!isAxiosError(error)) {
    return false;
  }

  const axiosError = error as AxiosError;

  // Network errors have no response (connection failed before reaching server)
  // or have specific error codes indicating network issues
  return (
    axiosError.response === undefined ||
    NETWORK_ERROR_CODES.includes(
      axiosError.code as typeof NETWORK_ERROR_CODES[number],
    )
  );
};

/**
 * Checks if an error should not be retried.
 * Network errors and client errors (4xx) should not be retried.
 */
export const shouldNotRetry = (error: unknown): boolean => {
  if (isNetworkError(error)) {
    return true;
  }

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    // Don't retry on 4xx errors (client errors)
    if (
      axiosError.response &&
      axiosError.response.status >= 400 &&
      axiosError.response.status < 500
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Gets a user-friendly error message based on the error type
 */
export const getNetworkErrorMessage = (error: unknown): string => {
  if (!isAxiosError(error)) {
    return 'The backend service is currently unavailable. Please try again later.';
  }

  const axiosError = error as AxiosError;

  if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
    return 'The request timed out. This might be a DNS caching issue. Try clearing your browser cache or using incognito mode.';
  }

  if (axiosError.code === 'ENOTFOUND') {
    return 'Unable to resolve the server address. This might be a DNS caching issue. Try clearing your browser cache or using incognito mode.';
  }

  if (axiosError.code === 'ECONNREFUSED') {
    return 'Connection refused. The backend service may be down. Please try again later.';
  }

  return 'The backend service is currently unavailable. Please try again later.';
};
