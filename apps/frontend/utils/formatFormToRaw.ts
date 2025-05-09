import { KoboCommonKeys } from '@wfp-dmp/interfaces';
import { mapKeys, mapValues, omit } from 'lodash';

import { DroughtFormType } from 'components/FormValidation/DroughtFormValidation/DroughtFormType';
import { FloodFormType } from 'components/FormValidation/FloodFormValidation/FloodFormType';
import { IncidentFormType } from 'components/FormValidation/IncidentFormValidation/IncidentFormType';

export const formatFormToRaw = (
  formValues: FloodFormType | DroughtFormType | IncidentFormType,
  commonKeysMapping: Record<string, string>,
  specificKeysMapping: Record<string, string>,
) => {
  const commonData: Omit<
    Record<KoboCommonKeys, string>,
    'id' | 'validationStatus' | 'submissionTime'
  > = {
    province: formValues.region.province[0],
    district: formValues.region.district[0],
    commune: formValues.region.commune[0],
    // TODO - FIXME: This is just a placeholder for the village field
    village: formValues.region.village,
    // TODO - FIXME: This is just a placeholder for the location field
    location: formValues.region.commune[0],
    entryName: formValues.interviewer,
    disTyp: formValues.disTyp,
    phone: formValues.phone,
    entryDate: formValues.reportDate.format('YYYY-MM-DD'),
    disasterDate: formValues.incidentDate.format('YYYY-MM-DD'),
  };

  const specificData = omit(formValues.specific, ['id']);

  const koboFormatData = {
    ...mapKeys(commonData, (_, key) => commonKeysMapping[key]),
    ...mapKeys(specificData, (_, key) => specificKeysMapping[key]),
  };

  return mapValues(koboFormatData, value => (value === '' ? null : value));
};
