import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';

// drop the forms that have be flagged as not approved
// Cannot be done in the backend because $ne doesn't work as a query option
export const dropNotApproved = (
  forms: FloodDto[] | DroughtDto[] | IncidentDto[],
): FloodDto[] | DroughtDto[] | IncidentDto[] => {
  // Change type before filter for typescript
  // https://github.com/microsoft/TypeScript/issues/44373
  const filteredResults = (
    forms as (FloodDto | DroughtDto | IncidentDto)[]
  ).filter(form => {
    const validationStatus = form._validation_status;

    return validationStatus.uid !== ValidationStatusValue.notApproved;
  }) as FloodDto[] | DroughtDto[] | IncidentDto[];

  return filteredResults;
};
