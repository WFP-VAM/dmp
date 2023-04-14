import {
  FLOOD,
  floodSpecificKeys,
  KoboCommonKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import { mapKeys, mapValues, omit } from 'lodash';

import { FloodFormType } from 'components/FormValidation/FloodFormValidation/FloodFormType';

export const formatFloodFormToRaw = (formValues: FloodFormType) => {
  const commonKeys: Record<string, string> = koboKeys[FLOOD];
  const specificKeys: Record<string, string> = floodSpecificKeys;

  const commonData: Omit<Record<KoboCommonKeys, string>, 'id'> = {
    province: formValues.region.province,
    district: formValues.region.district,
    commune: formValues.region.commune,
    entryName: formValues.interviewer,
    disTyp: formValues.disTyp,
    phone: formValues.phone,
    entryDate: formValues.reportDate.format('YYYY-MM-DD'),
    disasterDate: formValues.incidentDate.format('YYYY-MM-DD'),
  };

  const specificData = omit(formValues.floodSpecific, ['id']);

  const koboFormatData = {
    ...mapKeys(commonData, (_, key) => commonKeys[key]),
    ...mapKeys(specificData, (_, key) => specificKeys[key]),
  };

  return mapValues(koboFormatData, value => (value === '' ? null : value));
};
