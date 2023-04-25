import { DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from './aggregate';

const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

const countCategoriesKeys = [
  DroughtSpecific.Electric,
  DroughtSpecific.ElecForHeal,
  DroughtSpecific.NuKidColWat,
  DroughtSpecific.IfYes,
  DroughtSpecific.NuWoCollWat,
  DroughtSpecific.Yes,
  DroughtSpecific.TreatOccur,
];

const sumKeys = Object.values(omit(DroughtSpecific, countCategoriesKeys));

export const generateDroughtDetailedReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys,
    sumKeys,
    countCategoriesKeys,
  });
};
