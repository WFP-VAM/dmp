import { compact, sum } from 'lodash';

/** sums the values of a given 'key' in an array of object */
export const sumAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const sumValue = sum(compact(group.map(x => Number(x[key]))));

  return { [key]: sumValue === 0 ? undefined : sumValue };
};
