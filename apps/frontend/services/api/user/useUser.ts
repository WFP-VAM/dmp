import { GetUserDto, UpdateUserDto } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { logger } from 'services/logger';

import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export const useGetMe = () => {
  const { data, error } = useSWR<GetUserDto, unknown>(ApiRoutes.me);

  if (error !== undefined) {
    logger.error(error);

    return;
  }

  return data;
};

export const updateMe = async (data: UpdateUserDto): Promise<void> => {
  await apiClient.patch<unknown>(ApiRoutes.users, data);
};

export const useIsSignedInUserAdmin = (): boolean => {
  const user = useGetMe();

  if (user) {
    return Boolean(user.roles.includes('admin'));
  }

  return false;
};
