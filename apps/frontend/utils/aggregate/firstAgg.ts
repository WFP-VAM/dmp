import { compact } from 'lodash';

export const firstAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const firstValue = compact(group.map(x => x[key]))[0];

  return { [key]: firstValue };
};
