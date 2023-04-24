import { floodSpecificKeysArray, FloodSpecificType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from '../aggregate';
import { filterNFlood } from '../filterNFlood';

const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

const sumKeys = Object.values(
  omit(floodSpecificKeysArray, [
    'floodN',
    'RicePrice',
    'threat',
    'other',
  ]),
);


const countCategoriesKeys: FloodSpecificType[] = ['RicePrice'];
const countMultipleChoicesKeys: FloodSpecificType[] = ['threat'];

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
