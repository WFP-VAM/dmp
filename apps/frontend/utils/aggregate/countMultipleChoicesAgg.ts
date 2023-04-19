import { compact, flatten, mapKeys } from 'lodash';

export const countMultipleChoicesAgg = (
  key: string,
  group: Record<string, string | undefined>[],
) => {
  const allChoices = compact(flatten(group.map(x => x[key]?.split(' '))));

  if (allChoices.length === 0) return { [key]: undefined };
  const counts: Record<string, number | undefined> = {};
  allChoices.forEach(value => {
    const currentValue = counts[value];
    counts[value] = currentValue === undefined ? 1 : currentValue + 1;
  });

  const countMultipleChoicesValue = mapKeys(
    counts,
    (_, choice) => `${key}_${choice}`,
  );

  return countMultipleChoicesValue;
};
