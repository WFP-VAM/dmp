import { KoboCommonKeys } from '@wfp-dmp/interfaces';
import { omit } from 'lodash';

import { aggregate } from '../aggregate';
import {
  countCategoriesKeys,
  countMultipleChoicesKeys,
  firstKeys,
  sumKeys,
} from './floodDetailedAggregateKeys';

export const generateFloodDetailedReport = (
  data: Record<string, string | number | undefined>[],
) => {
  // TODO n flood filtering

  return aggregate({
    data: omit(data, ['id']) as Record<string, string | undefined>[],
    groupKey: KoboCommonKeys.commune,
    firstKeys,
    sumKeys,
    countCategoriesKeys,
    countMultipleChoicesKeys,
  });
};
