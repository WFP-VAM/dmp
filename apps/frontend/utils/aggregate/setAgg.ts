import { compact, flatten } from 'lodash';

/**
 * Parses space-separated strings and returns an object with the key and a Set of unique values.
 * @param key The key to look for in the group objects
 * @param group An array of objects containing the key
 * @returns An object with the key and an array of unique values parsed from the space-separated strings
 */
export const getUniqueValuesSet = (
  key: string,
  group: Record<string, string | undefined>[],
): { [key: string]: string[] | undefined } => {
  const allValues = compact(flatten(group.map(x => x[key]?.split(' '))));
  const uniqueValues = Array.from(new Set(allValues));

  return { [key]: uniqueValues.length === 0 ? undefined : uniqueValues };
};
