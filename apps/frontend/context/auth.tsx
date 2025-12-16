import { GetUserDto } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { authFetcher } from 'services/api/auth/authFetcher';
import { CustomError } from 'services/errors/custom-error';

type AuthContext = {
  isLoading: boolean;
  user: GetUserDto | undefined;
  error: unknown;
};

const authContextDefault: AuthContext = {
  isLoading: true,
  user: undefined,
  error: null,
};

export const AuthContext = React.createContext<AuthContext>(authContextDefault);

AuthContext.displayName = 'AuthContext';

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  return auth;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  // Use custom fetcher that handles token verification and refresh
  // This moves token validation logic from the axios interceptor to AuthContext
  const { data, isLoading, error } = useSWR<GetUserDto, unknown>(
    ApiRoutes.me,
    authFetcher,
  );

  const value = {
    user: data,
    error,
    isLoading,
  };

  useEffect(() => {
    // Handle authentication errors - redirect to login
    if (
      error instanceof CustomError &&
      error.name === 'authentication' &&
      router.pathname !== '/login'
    ) {
      void router.push('/login');
    }
    // Network errors (backend down) are handled by SWR's onErrorRetry
    // which will stop retrying, allowing isLoading to become false
    // The error will be available in the context for components to handle
  }, [error, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
