import { compact, uniq } from 'lodash';

export const countAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const countValue = compact(uniq(group.map(x => x[key]))).length;

  return { [key]: countValue === 0 ? undefined : countValue };
};
