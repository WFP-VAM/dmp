import { compact, flatten, mapKeys } from 'lodash';

/** counts the number of time a choice for a multiple-choice appears for a given 'key' in an array of object.
 * Kobo stores multiple-choices in a string. Format: "choice1 choice2"
 * this function parses the strings, count the occurence of each choices though the whole array
 * returns: an object with one entry for each choice (format : {<initial-key>-<choice-value>: count, ...})
 */
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
