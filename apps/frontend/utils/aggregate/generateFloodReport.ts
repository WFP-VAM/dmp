import { FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from './aggregate';
import {
  communeLeveldReportFirstKeys,
  provinceLevelReportCountKeys,
} from './commonReportAggregateKeys';
import { filterNFlood } from './filterNFlood';

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

export const generateFloodCommuneLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  const filteredData = filterNFlood(
    data,
    KoboCommonKeys.commune,
    KoboCommonKeys.disasterDate,
    FloodSpecific.floodN,
  );

  return aggregate({
    data: filteredData,
    groupKey: KoboCommonKeys.commune,
    firstKeys: communeLeveldReportFirstKeys,
    sumKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
  });
};

export const generateFloodProvinceLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  const filteredData = filterNFlood(
    data,
    KoboCommonKeys.commune,
    KoboCommonKeys.disasterDate,
    FloodSpecific.floodN,
  );

  return aggregate({
    data: filteredData,
    groupKey: KoboCommonKeys.province,
    sumKeys,
    countKeys: provinceLevelReportCountKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
  });
};
