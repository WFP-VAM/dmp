import {
  DisasterDtoType,
  formatCommonFields,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { chain, compact, pick, range, uniq } from 'lodash';
import { useMemo } from 'react';

import { NUMBER_LAST_DAYS } from 'constant';
import { dropNotApproved } from 'utils/dropNotApproved';

const getDisastersPerDate = (forms: DisasterDtoType[] | undefined) => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  const dateKey = KoboCommonKeys.entryDate;
  const formattedForms = dropNotApproved(forms).map(form => {
    return pick(formatCommonFields(form), [dateKey, KoboCommonKeys.disTyp]);
  });

  // create an array of fake data points so the days without any entries are still displayed
  const lastNDates = range(NUMBER_LAST_DAYS).map(dayDiff => ({
    [dateKey]: dayjs().subtract(dayDiff, 'day').format('YYYY-MM-DD'),
    [KoboCommonKeys.disTyp]: undefined,
  }));

  const disastersPerDate = chain([...formattedForms, ...lastNDates])
    .groupBy(dateKey)
    .map((array, keyValue) => {
      return {
        [dateKey]: keyValue,
        disTyps: uniq(compact(array.map(disaster => disaster.disTyp))).sort(),
      };
    })
    .orderBy(dateKey, 'desc')
    .value();

  return disastersPerDate;
};

export const HomeTable = ({
  forms,
  isLoading,
}: {
  forms?: DisasterDtoType[];
  isLoading: boolean;
}): JSX.Element => {
  const disastersPerDate = useMemo(() => getDisastersPerDate(forms), [forms]);

  if (isLoading) return <div>LOADING</div>;

  return <div>{JSON.stringify(disastersPerDate)}</div>;
};
