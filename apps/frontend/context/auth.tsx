import { GetUserDto } from '@wfp-dmp/interfaces';
import React from 'react';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';

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
  const { data, isLoading, error } = useSWR<GetUserDto, unknown>(ApiRoutes.me);

  const value = {
    user: data,
    error,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
