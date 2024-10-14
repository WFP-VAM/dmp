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
      try {
        const { data: updatedValidationStatus } =
          await apiClient.patch<ValidationStatusDto>(url, {
            disasterType,
            id,
            validationStatusValue: arg,
          });

        return updatedValidationStatus;
      } catch (error) {
        console.error('Error updating validation status:', error);
        throw error;
      }
    },
  );

  return { trigger, isMutating };
};
