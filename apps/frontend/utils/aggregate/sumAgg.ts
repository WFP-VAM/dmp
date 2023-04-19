import { compact, sum } from 'lodash';

export const sumAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const sumValue = sum(compact(group.map(x => Number(x[key]))));

  return { [key]: sumValue === 0 ? undefined : sumValue };
};
