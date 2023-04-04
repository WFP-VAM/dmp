import { ValidationStatusDto, ValidationStatusValue } from '@wfp-dmp/interfaces';

export const validationStatusFactory = (
  validationStatusValue: ValidationStatusValue,
): ValidationStatusDto => ({
  timestamp: 1678914777,
  uid: validationStatusValue,
  by_whom: 'test',
  color: '#ff0000',
  label: 'Label',
});
