import { Box, Typography } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';
import useSWR from 'swr';

import { HomeTable } from 'components/HomeTable';
import { ApiRoutes } from 'services/api/apiRoutes';

export const Home = (): JSX.Element => {
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );

  return (
    <Box>
      <Typography variant="h4" mb={5}>
        <FormattedMessage id="navigation.banner" />
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box sx={{ maxWidth: 700, flexGrow: 1 }}>
          <HomeTable isLoading={isLoading} forms={lastForms} />
        </Box>
      </Box>
    </Box>
  );
};
