import { Card, Stack, Typography, useTheme } from '@mui/material';
import {
  DisasterDtoType,
  formatCommonFields,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { compact, groupBy, map, orderBy, pick, range, uniq } from 'lodash';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { NUMBER_LAST_DAYS } from 'constant';
import { useLanguageContext } from 'context';
import { formatDate, getDateWeek } from 'utils/date';
import { dropNotApproved } from 'utils/dropNotApproved';

import HomeTableRow from './HomeTableRow';
import { DisasterLocation, DisasterPerDate } from './utils';

const getDisastersPerDate = (
  forms: DisasterDtoType[] | undefined,
): DisasterPerDate[] => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  const dateKey = KoboCommonKeys.entryDate;
  const formattedForms: Array<{
    [KoboCommonKeys.entryDate]: string;
    [KoboCommonKeys.disTyp]?: string;
    [KoboCommonKeys.province]?: string;
    [KoboCommonKeys.district]?: string;
  }> = dropNotApproved(forms).map(form => {
    return pick(formatCommonFields(form), [
      dateKey,
      KoboCommonKeys.disTyp,
      KoboCommonKeys.province,
      KoboCommonKeys.district,
    ]) as {
      [KoboCommonKeys.entryDate]: string;
      [KoboCommonKeys.disTyp]?: string;
      [KoboCommonKeys.province]?: string;
      [KoboCommonKeys.district]?: string;
    };
  });

  const lastNDates = range(NUMBER_LAST_DAYS).map(dayDiff => ({
    [dateKey]: dayjs().subtract(dayDiff, 'day').format('YYYY-MM-DD'),
    [KoboCommonKeys.disTyp]: undefined,
  }));

  const groupedData = groupBy([...formattedForms, ...lastNDates], dateKey);
  const disastersPerDate = map(
    groupedData,
    (array: typeof formattedForms[0][], keyValue): DisasterPerDate => {
      const disTypLocations = array.reduce<Record<string, DisasterLocation[]>>(
        (acc, disaster) => {
          const disTyp = disaster[KoboCommonKeys.disTyp];
          if (disTyp != null && disTyp.trim() !== '') {
            acc[disTyp] = disTyp in acc ? acc[disTyp] : [];
            acc[disTyp].push({
              province: disaster[KoboCommonKeys.province] ?? '',
              district: disaster[KoboCommonKeys.district] ?? '',
            });
          }

          return acc;
        },
        {},
      );

      return {
        entryDate: keyValue,
        disTyps: uniq(compact(array.map(disaster => disaster.disTyp))).sort(),
        disTypLocations,
      } as unknown as DisasterPerDate;
    },
    // TODO - explore why this is necessary
  ) as unknown as DisasterPerDate[];

  return orderBy(disastersPerDate, [dateKey], ['desc']);
};

interface HomeTableProps {
  forms?: DisasterDtoType[];
  isLoading: boolean;
}

export const HomeTable = ({
  forms,
  isLoading,
}: HomeTableProps): JSX.Element => {
  const theme = useTheme();
  const disastersPerDate = useMemo(() => getDisastersPerDate(forms), [forms]);
  const { language } = useLanguageContext();

  console.log({ language });

  const currentDate = new Date();
  const monthTranslated = currentDate.toLocaleString(language, {
    month: 'long',
  });
  const week = getDateWeek(currentDate);
  const formattedDate = formatDate(currentDate, 'MM/DD');

  return (
    <Card style={{ padding: theme.spacing(3) }}>
      <Stack gap={theme.spacing(1)}>
        <Typography fontWeight={600} variant="subtitle2">
          {monthTranslated} - <FormattedMessage id="week" /> {week} -{' '}
          {formattedDate}
        </Typography>
        <HomeTableRow
          isLoading={isLoading}
          disastersPerDate={disastersPerDate}
        />
      </Stack>
    </Card>
  );
};
