import { GetUserDto } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
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

  const { data, isLoading, error } = useSWR<GetUserDto, unknown>(ApiRoutes.me);

  const value = {
    user: data,
    error,
    isLoading,
  };

  useEffect(() => {
    if (
      error instanceof CustomError &&
      error.name === 'authentication' &&
      router.pathname !== '/login'
    ) {
      void router.push('/login');
    }
  }, [error, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
