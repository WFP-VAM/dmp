import {
  FloodSpecific,
  floodSpecificKeysArray,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { aggregate } from '../aggregate';
import { filterNFlood } from '../filterNFlood';

const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

const sumKeys = floodSpecificKeysArray.filter(
  k => !['floodN', 'RicePrice', 'threat', 'other'].includes(k),
);

const countCategoriesKeys: FloodSpecific[] = ['RicePrice'];
const countMultipleChoicesKeys: FloodSpecific[] = ['threat'];

export const generateFloodDetailedReport = (
  data: Record<string, string | undefined>[],
) => {
  const filteredData = filterNFlood(
    data,
    KoboCommonKeys.commune,
    KoboCommonKeys.disasterDate,
    'floodN',
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
