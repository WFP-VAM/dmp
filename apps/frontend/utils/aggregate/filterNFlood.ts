import { chain, omit, orderBy } from 'lodash';

// Regex to check that a date as the following format: YYYY-MM-DD
const DATE_PATTERN = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

// TODO - Type this function.
export const filterNFlood = (
  data: Record<string, string | undefined>[],
  communeKey: string,
  disasterDateKey: string,
  nFloodKey: string,
) => {
  const tmpNFloodKey = 'tmpNFloodKey';
  // the group key is flood number, year of disaster and commune
  const dataWithGroupKey = data.map(form => {
    if (!DATE_PATTERN.test(form[disasterDateKey] ?? ''))
      throw Error(
        'Cannot filter based on the flood number because a date is not formatted as YYYY-MM-DD',
      );

    return {
      ...form,
      [tmpNFloodKey]: `${form[communeKey] ?? ''}-${
        form[disasterDateKey]?.substring(0, 4) ?? ''
      }-${form[nFloodKey] ?? ''}`,
    } as Record<string, string | undefined>;
  });

  const filteredData: Record<string, string | undefined>[] = chain(
    dataWithGroupKey,
  )
    .groupBy(tmpNFloodKey)
    .map(array => {
      const sortedForms = orderBy(
        array,
        [disasterDateKey, 'submissionTime'],
        ['desc', 'desc'],
      );

      return omit(sortedForms[0], tmpNFloodKey);
    })
    .value();

  return filteredData;
};
