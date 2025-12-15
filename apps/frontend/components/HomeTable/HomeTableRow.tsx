import {
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { range } from 'lodash';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { DisasterIcon } from 'components/DisasterIcon';
import { NUMBER_LAST_DAYS } from 'constant';
import { useAuth } from 'context/auth';
import { colors } from 'theme/muiTheme';
import { formatDate } from 'utils/date';

import { DisasterLocation, DisasterPerDate } from './utils';

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

interface HomeTableRowProps {
  isLoading: boolean;
  disastersPerDate: DisasterPerDate[];
}

const HomeTableRow = ({ isLoading, disastersPerDate }: HomeTableRowProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const showProvinces = ['admin', 'ncdm'].includes(user?.roles[0] ?? '');

  if (isLoading) {
    return (
      <>
        {range(NUMBER_LAST_DAYS).map(id => (
          <Stack key={id} direction="row" gap={theme.spacing(2)}>
            <Skeleton variant="rectangular" width={103} height={44} />
            <Stack direction="row" gap={theme.spacing(1)}>
              {range(Math.floor(Math.random() * 6)).map(id2 => (
                <Skeleton key={id2} variant="circular" width={44} height={44} />
              ))}
            </Stack>
          </Stack>
        ))}
      </>
    );
  }

  return (
    <>
      {disastersPerDate.map(disasters => (
        <Stack
          key={disasters.entryDate}
          direction="row"
          gap={{ xs: theme.spacing(1), sm: theme.spacing(2) }}
          sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
        >
          <Typography
            padding={{ xs: theme.spacing(0.75), sm: theme.spacing(1.25) }}
            borderRadius="4px"
            style={{ backgroundColor: colors.color2 }}
            color="white"
            fontSize={{ xs: '0.75rem', sm: '0.875rem' }}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {formatDate(disasters.entryDate, 'MM-DD-YYYY')}
          </Typography>
          <Stack
            direction="row"
            gap={{ xs: theme.spacing(0.75), sm: theme.spacing(1.25) }}
            sx={{ flexWrap: 'wrap' }}
          >
            {disasters.disTyps.length === 0 && (
              <Typography display="flex" alignItems="center">
                <FormattedMessage id="home.no_report" />
              </Typography>
            )}
            {disasters.disTyps.length !== 0 &&
              disasters.disTyps.map(disTyp => (
                <Tooltip
                  key={disTyp}
                  title={
                    <>
                      <strong>
                        <FormattedMessage id={`disasters.${disTyp}`} />
                      </strong>
                      <br />
                      {filterLocations(
                        disasters.disTypLocations[disTyp],
                        showProvinces,
                      ).map((location, index) =>
                        renderLocation(location, showProvinces, index),
                      )}
                    </>
                  }
                >
                  <IconButton
                    style={{
                      border: `1px solid ${colors.color3}`,
                      borderRadius: '4px',
                      aspectRatio: 1,
                      color: colors.color3,
                    }}
                    component={Link}
                    sx={{
                      width: { xs: 36, sm: 44 },
                      height: { xs: 36, sm: 44 },
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
              ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default HomeTableRow;
