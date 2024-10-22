import { filter, groupBy, has, mapKeys, mapValues } from 'lodash';

/** counts the number of time a category appear for a given field 'key' in an array of object.
 * returns an object with one entry for each non nullable category (format : {<initial-key>-<category-value>: count, ...})
 */
export const countCategoriesAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const filteredGroup = filter(
    group,
    object =>
      has(object, key) && object[key] !== undefined && object[key] !== '',
  );

  const groupedData = groupBy(filteredGroup, key);
  const countCategoriesValue = mapValues(groupedData, ar => ar.length);
  const result = mapKeys(
    countCategoriesValue,
    (_, category) => `${key}_${category}`,
  );

  return Object.keys(result).length === 0 ? { [key]: undefined } : result;
};
