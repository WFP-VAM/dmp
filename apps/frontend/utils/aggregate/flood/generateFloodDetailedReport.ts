import { FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from '../aggregate';
import { filterNFlood } from '../filterNFlood';

const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

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

export const generateFloodDetailedReport = (
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
    firstKeys,
    sumKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
  });
};
