import { assign, groupBy, map, sortBy } from 'lodash';

import { countAgg } from './countAgg';
import { countCategoriesAgg } from './countCategoriesAgg';
import { countMultipleChoicesAgg } from './countMultipleChoicesAgg';
import { firstAgg } from './firstAgg';
import { sumAgg } from './sumAgg';

interface IProps {
  data: Record<string, string | undefined>[];
  groupKey: string;
  firstKeys?: string[];
  sumKeys?: string[];
  countKeys?: string[];
  countCategoriesKeys?: string[];
  countMultipleChoicesKeys?: string[];
}

export const aggregate = ({
  data,
  groupKey,
  firstKeys = [],
  sumKeys = [],
  countKeys = [],
  countCategoriesKeys = [],
  countMultipleChoicesKeys = [],
}: IProps) => {
  const groupedData = groupBy(data, groupKey);
  const aggregatedData = map(groupedData, (array, keyValue) => {
    const firstValues = firstKeys.map(key => firstAgg(key, array));
    const sumValues = sumKeys.map(key => sumAgg(key, array));
    const countValues = countKeys.map(key => countAgg(key, array));
    const countCategoriesValues = countCategoriesKeys.map(key =>
      countCategoriesAgg(key, array),
    );
    const countMultipleChoicesValues = countMultipleChoicesKeys.map(key =>
      countMultipleChoicesAgg(key, array),
    );

    return assign(
      { [groupKey]: keyValue },
      ...firstValues,
      ...sumValues,
      ...countValues,
      ...countCategoriesValues,
      ...countMultipleChoicesValues,
    ) as Record<string, string | number | undefined>;
  });

  return sortBy(aggregatedData, groupKey);
};
