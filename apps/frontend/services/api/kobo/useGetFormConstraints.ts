import { DisasterType, KoboFieldConstraintDto } from '@wfp-dmp/interfaces';
import path from 'path';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

// Constraints rarely change (they only move when the Kobo form itself is redeployed),
// so we fetch them once per disaster type and let SWR's default caching/dedup handle re-use
// across the tables rendered for a given form.
export const useGetFormConstraints = (disasterType: DisasterType) => {
  const { data, isLoading } = useSWR(
    [ApiRoutes.formConstraints, disasterType],
    async ([relativePath, type]) => {
      const url = path.join(relativePath, type);
      const { data: constraints } = await apiClient.get<
        KoboFieldConstraintDto[]
      >(url);

      return constraints;
    },
  );

  return { data, isLoading };
};
