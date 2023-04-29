import { compact } from 'lodash';

/** returns the first non nullable value for a given 'key' in an array of objects */
export const firstAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const firstValue = compact(group.map(x => x[key]))[0];

  return { [key]: firstValue };
};
