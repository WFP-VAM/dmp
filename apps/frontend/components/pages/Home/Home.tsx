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
      <Typography variant="h3" mb={5}>
        <FormattedMessage id="navigation.banner" />
      </Typography>
      <HomeTable isLoading={isLoading} forms={lastForms} />
    </Box>
  );
};
