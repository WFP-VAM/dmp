import { mutate } from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { removeAccessToken } from 'services/api/auth/utils';
import { apiClient } from 'services/api/client';

const clearCache = () => mutate(() => true, undefined, { revalidate: false });
export const logout = async () => {
  void clearCache();
  removeAccessToken();
  ApiRoutes.logout;
  await apiClient.post<unknown>(ApiRoutes.logout);
};
