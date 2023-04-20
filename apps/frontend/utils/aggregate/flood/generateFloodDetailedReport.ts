import { FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { aggregate } from '../aggregate';
import { filterNFlood } from '../filterNFlood';
import {
  countCategoriesKeys,
  countMultipleChoicesKeys,
  firstKeys,
  sumKeys,
} from './floodDetailedAggregateKeys';

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
