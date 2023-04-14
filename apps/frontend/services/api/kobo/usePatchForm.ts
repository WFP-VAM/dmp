import { DisasterType } from '@wfp-dmp/interfaces';
import path from 'path';
import useSWRMutation from 'swr/mutation';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const usePatchForm = (
  formDisasterType: DisasterType,
  formId: string,
) => {
  const { trigger, isMutating } = useSWRMutation(
    [ApiRoutes.form, formDisasterType, formId],
    async (
      [relativePath, disasterType, id],
      { arg }: { arg: Record<string, string | null | undefined> },
    ) => {
      const url = path.join(relativePath, disasterType, id);
      const {
        data: { status },
      } = await apiClient.patch<{
        status: number;
      }>(url, arg);

      return status;
    },
  );

  return { trigger, isMutating };
};
