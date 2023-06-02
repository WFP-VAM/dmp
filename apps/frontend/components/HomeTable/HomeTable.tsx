import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {
  DisasterDtoType,
  formatCommonFields,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { chain, compact, pick, range, uniq } from 'lodash';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

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

  return (
    <TableContainer component={Paper}>
      <Table>
        {isLoading ? (
          <TableBody>
            {range(NUMBER_LAST_DAYS).map(id => {
              return (
                <TableRow key={id}>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            {disastersPerDate.map(disasters => (
              <TableRow key={disasters.entryDate}>
                <TableCell sx={{ backgroundColor: '#f5f8ff', width: 150 }}>
                  <Typography>{disasters.entryDate}</Typography>
                </TableCell>
                <TableCell>
                  {disasters.disTyps.length === 0 ? (
                    <Typography>
                      <FormattedMessage id="report_page.noData" />
                    </Typography>
                  ) : (
                    JSON.stringify(disasters.disTyps)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
