import { FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from './aggregate';
import {
  communeLeveldReportFirstKeys,
  provinceLevelReportCountKeys,
} from './commonReportAggregateKeys';

const sumKeys = Object.values(
  omit(FloodSpecific, [
    FloodSpecific.floodN,
    FloodSpecific.RicePrice,
    FloodSpecific.threat,
    FloodSpecific.other,
  ]),
);

const countCategoriesKeys = [FloodSpecific.RicePrice];
const countMultipleChoicesKeys = [FloodSpecific.threat];
const setAggKeys = [KoboCommonKeys.village];

export const generateFloodCommuneLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data: data,
    groupKey: KoboCommonKeys.commune,
    firstKeys: communeLeveldReportFirstKeys,
    sumKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
    setAggKeys,
  });
};

export const generateFloodProvinceLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data: data,
    groupKey: KoboCommonKeys.province,
    sumKeys,
    countKeys: provinceLevelReportCountKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
    setAggKeys,
  });
};
