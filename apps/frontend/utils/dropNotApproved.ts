import { ValidationStatusValue } from '@wfp-dmp/interfaces';

import {
  DisasterDtoType,
  DroughtDto,
  FloodDto,
  IncidentDto,
} from '../../../packages/interfaces/dist';

// drop the forms that have be flagged as not approved
// Cannot be done in the backend because $ne doesn't work as a query option
export const dropNotApproved = (
  forms: DisasterDtoType[],
): FloodDto[] | DroughtDto[] | IncidentDto[] => {
  // Change type before filter for typescript
  // https://github.com/microsoft/TypeScript/issues/44373
  const filteredResults = forms.filter(form => {
    return form._validation_status.uid !== ValidationStatusValue.notApproved;
  });

  return filteredResults as FloodDto[] | DroughtDto[] | IncidentDto[];
};
