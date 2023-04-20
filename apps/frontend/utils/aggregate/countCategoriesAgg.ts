import { chain, has } from 'lodash';

export const countCategoriesAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const countCategoriesValue = chain(group)
    .filter(
      object =>
        has(object, key) && object[key] !== undefined && object[key] !== '',
    )
    .groupBy(key)
    .mapValues(ar => ar.length)
    .mapKeys((_, category) => `${key}_${category}`)
    .value();

  return Object.keys(countCategoriesValue).length === 0
    ? { [key]: undefined }
    : countCategoriesValue;
};
