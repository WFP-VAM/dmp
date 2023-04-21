import { chain, has } from 'lodash';

/** counts the number of time a category appear for a given field 'key' in an array of object.
 * returns an object with one entry for each non nullable category (format : {<initial-key>-<category-value>: count, ...})
 */
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
