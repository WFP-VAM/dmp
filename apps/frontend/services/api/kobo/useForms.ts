import { DroughtDto, FloodDto, IncidentDto } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const useForms = (disasterType: string) => {
  const { data, isLoading } = useSWR(
    [ApiRoutes.forms, disasterType],
    async ([relativePath, disType]) => {
      const { data: formsData } = await apiClient.get<
        FloodDto[] | DroughtDto[] | IncidentDto[] | []
      >(relativePath, {
        params: { DisTyp: disType },
      });

      return formsData;
    },
  );

  return { data, isLoading };
};
