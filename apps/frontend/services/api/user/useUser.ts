import { UpdateUserDto } from '@wfp-dmp/interfaces';

import { useAuth } from 'context/auth';

import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export const updateMe = async (data: UpdateUserDto): Promise<void> => {
  await apiClient.patch<unknown>(ApiRoutes.users, data);
};

export const useIsSignedInUserAdmin = (): boolean => {
  const { user } = useAuth();

  if (user) {
    return Boolean(user.roles.includes('admin'));
  }

  return false;
};
