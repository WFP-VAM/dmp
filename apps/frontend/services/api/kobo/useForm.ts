import {
  DisasterType,
  DroughtDto,
  FloodDto,
  IncidentDto,
} from '@wfp-dmp/interfaces';
import path from 'path';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const useForm = (formDisasterType: DisasterType, formId: string) => {
  console.log('in hook');
  const { data } = useSWR(
    [ApiRoutes.form, formDisasterType, formId],
    async (relativePath, disasterType, id) => {
      const url = path.join(relativePath, disasterType, id);
      const { data: formData } = await apiClient.get<
        FloodDto | DroughtDto | IncidentDto
      >(url);

      return formData;
    },
  );

  return data;
};
