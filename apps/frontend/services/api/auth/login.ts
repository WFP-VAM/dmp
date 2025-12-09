import { mutate } from 'swr';

import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';
import { getAccessFromResponse, setAccessToken } from './utils';

export type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData): Promise<void> => {
  setAccessToken(
    getAccessFromResponse(await apiClient.post<unknown>(ApiRoutes.login, data)),
  );
  // Trigger SWR to revalidate /api/me immediately after login
  // This ensures the user data is fetched right away
  void mutate(ApiRoutes.me);
};
