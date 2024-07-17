import {
  DisasterType,
  ValidationStatusDto,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';
import path from 'path';
import useSWRMutation from 'swr/mutation';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const usePatchValidationStatus = (
  formDisasterType: DisasterType,
  formId: string,
) => {
  const { trigger, isMutating } = useSWRMutation(
    [ApiRoutes.form, formDisasterType, formId],
    async (
      [relativePath, disasterType, id],
      { arg }: { arg: ValidationStatusValue },
    ) => {
      const url = path.join(relativePath, 'validationStatus');
      const { data: updatedValidationStatus } =
        await apiClient.patch<ValidationStatusDto>(url, {
          disasterType,
          id,
          validationStatusValue: arg,
        });

      // Notify other tabs that the form data has been updated.
      localStorage.setItem('formDataTrigger', JSON.stringify(new Date()));

      return updatedValidationStatus;
    },
  );

  return { trigger, isMutating };
};
