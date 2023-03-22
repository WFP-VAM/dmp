import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const useForms = (disasterType: string) => {
  const { data: formData } = useSWR(
    [ApiRoutes.forms, disasterType],
    async (relativePath, disType) => {
      await apiClient
        .get<unknown>(relativePath, { params: { DisTyp: disType } })
        .then(response => response.data);
    },
  );

  return formData;
};
