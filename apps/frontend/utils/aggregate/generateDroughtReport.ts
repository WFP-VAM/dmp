import { DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from './aggregate';
import {
  communeLeveldReportFirstKeys,
  provinceLevelReportCountKeys,
} from './commonReportAggregateKeys';

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

export const generateDroughtCommuneLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys: communeLeveldReportFirstKeys,
    sumKeys,
    countCategoriesKeys,
  });
};

export const generateDroughtProvinceLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.province,
    sumKeys,
    countKeys: provinceLevelReportCountKeys,
    countCategoriesKeys,
  });
};
