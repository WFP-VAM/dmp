import {
  DisasterType,
  floodSpecificKeys,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';
import path from 'path';
import useSWRMutation from 'swr/mutation';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

import { usePatchValidationStatus } from './usePatchValidationStatus';

export const usePatchForm = (
  formDisasterType: DisasterType,
  formId: string,
) => {
  const { trigger: validationTrigger } = usePatchValidationStatus(
    formDisasterType,
    formId,
  );

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

      // If the edit was successful, update the validation status to "onHold".
      if (status === 201) {
        await validationTrigger(ValidationStatusValue.onHold);
      }

      return status;
    },
  );

  return { trigger, isMutating: isMutating };
};

export const usePatchFloodNumber = (formIds: string[], floodNumber: number) => {
  const { trigger, isMutating } = useSWRMutation(
    [ApiRoutes.form, 'FLOOD'],
    async ([relativePath, disasterType]) => {
      const results = await Promise.all(
        formIds.map(async id => {
          const url = path.join(relativePath, disasterType, id);
          const {
            data: { status },
          } = await apiClient.patch<{
            status: number;
          }>(url, { [floodSpecificKeys.floodN]: `${floodNumber}` });

          return status;
        }),
      );

      return results;
    },
  );

  return { trigger, isMutating: isMutating };
};
