import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DisasterDtoType,
  formatCommonFields,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import { DisasterIcon } from 'components/DisasterIcon';
import { NUMBER_LAST_DAYS } from 'constant';
import { useAuth } from 'context/auth';
import dayjs from 'dayjs';
import { compact, groupBy, map, orderBy, pick, range, uniq } from 'lodash';
import Link from 'next/link';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { dropNotApproved } from 'utils/dropNotApproved';

interface DisasterLocation {
  province: string;
  district: string;
}

interface DisasterPerDate {
  entryDate: string;
  disTyps: string[];
  disTypLocations: Record<string, DisasterLocation[]>;
}

// Filter locations to show only unique provinces or districts
// Show provinces if user is admin or ncdm
const filterLocations = (
  locations: DisasterLocation[],
  showProvinces: boolean,
): DisasterLocation[] => {
  return locations.filter((location, index, self) =>
    showProvinces
      ? self.findIndex(l => l.province === location.province) === index
      : self.findIndex(l => l.district === location.district) === index,
  );
};

const renderLocation = (
  location: DisasterLocation,
  showProvinces: boolean,
  index: number,
): JSX.Element => {
  return (
    <span key={index}>
      {showProvinces ? (
        <FormattedMessage id={`province.${location.province}`} />
      ) : (
        <>
          <FormattedMessage id={`province.${location.province}`} />,{' '}
          <FormattedMessage id={`district.${location.district}`} />
        </>
      )}
      <br />
    </span>
  );
};

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
  const { user } = useAuth();
  const showProvinces = ['admin', 'ncdm'].includes(user?.roles[0] ?? '');
  const disastersPerDate = useMemo(() => getDisastersPerDate(forms), [forms]);

  return (
    <TableContainer component={Paper}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: 80, backgroundColor: '#dddddd' }}
      >
        <Typography fontWeight="bold">
          <FormattedMessage id="home.table_title" />
        </Typography>
      </Box>
      <Table>
        {isLoading ? (
          <TableBody>
            {range(NUMBER_LAST_DAYS).map(id => (
              <TableRow key={id}>
                <TableCell colSpan={9}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {disastersPerDate.map(disasters => (
              <TableRow key={disasters.entryDate}>
                <TableCell sx={{ backgroundColor: '#f5f8ff', width: 150 }}>
                  <Typography>
                    {dayjs(disasters.entryDate, 'YYYY-MM-DD').format(
                      'DD/MM/YYYY',
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="row">
                    {disasters.disTyps.length === 0 ? (
                      <Typography>
                        <FormattedMessage id="home.no_report" />
                      </Typography>
                    ) : (
                      disasters.disTyps.map(disTyp => (
                        <Box key={disTyp} mr={3}>
                          <Tooltip
                            title={
                              <>
                                <FormattedMessage id={`disasters.${disTyp}`} />
                                <br />
                                {filterLocations(
                                  disasters.disTypLocations[disTyp],
                                  showProvinces,
                                ).map((location, index) =>
                                  renderLocation(
                                    location,
                                    showProvinces,
                                    index,
                                  ),
                                )}
                              </>
                            }
                          >
                            <IconButton
                              component={Link}
                              sx={{
                                '&:hover': {
                                  color: '#494949',
                                },
                              }}
                              href={{
                                pathname: '/forms/search',
                                query: {
                                  disTyp,
                                  startDate: disasters.entryDate,
                                  endDate: disasters.entryDate,
                                },
                              }}
                            >
                              <DisasterIcon disTyp={disTyp} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ))
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
