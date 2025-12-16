import { Box, useTheme } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { HomeTable } from 'components/HomeTable';
import { ApiRoutes } from 'services/api/apiRoutes';

export const Home = (): JSX.Element => {
  const theme = useTheme();
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: 700 },
            maxWidth: 700,
            flexGrow: 1,
            px: { xs: theme.spacing(1), sm: theme.spacing(2) },
          }}
        >
          <HomeTable isLoading={isLoading} forms={lastForms} />
        </Box>
      </Box>
    </Box>
  );
};
