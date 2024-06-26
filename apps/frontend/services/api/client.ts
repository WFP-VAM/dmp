import axios from 'axios';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import jwtDecode from 'jwt-decode';

import { env } from 'services/env';
import { CustomError } from 'services/errors/custom-error';

import { ApiRoutes } from './apiRoutes';
import {
  getAccessFromResponse,
  getAccessToken,
  isTokenExpired,
  setAccessToken,
} from './auth/utils';

export const apiBaseUrl = env('NEXT_PUBLIC_API_BASE_URL');

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const access = getAccessToken();
    if (access === null) {
      return new CustomError('authentication', 'no-token');
    }
    if (isTokenExpired(jwtDecode(access))) {
      await refreshToken();
    }

    return {
      ...config,
      headers: Object.assign(config.headers ?? {}, {
        Authorization: `Bearer ${getAccessToken() as string}`,
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

const refreshToken = async (): Promise<void> => {
  const options: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };

  try {
    setAccessToken(
      getAccessFromResponse(
        await apiClient.post<unknown>(ApiRoutes.refresh, undefined, options),
      ),
    );
  } catch (error) {
    return Promise.reject(new CustomError('authentication', 'invalid-token'));
  }
};

createAuthRefreshInterceptor(apiClient, async () => await refreshToken(), {
  statusCodes: [401],
});
