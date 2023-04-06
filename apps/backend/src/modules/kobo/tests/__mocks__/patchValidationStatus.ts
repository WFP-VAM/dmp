import { DisasterType, ValidationStatusValue } from '@wfp-dmp/interfaces';

import { validationStatusFactory } from './validationStatusFactory';

export const patchValidationStatusMock = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disasterType: DisasterType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: string,
  validationStatusValue: ValidationStatusValue,
) => {
  return Promise.resolve(validationStatusFactory(validationStatusValue));
};
