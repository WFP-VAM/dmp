import { DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from './aggregate';
import {
  briefReportCountKeys,
  detailedReportFirstKeys,
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

export const generateDroughtDetailedReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys: detailedReportFirstKeys,
    sumKeys,
    countCategoriesKeys,
  });
};

export const generateDroughtBriefReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.province,
    sumKeys,
    countKeys: briefReportCountKeys,
    countCategoriesKeys,
  });
};
