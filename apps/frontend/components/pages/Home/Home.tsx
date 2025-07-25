import { Box } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { HomeTable } from 'components/HomeTable';
import { ApiRoutes } from 'services/api/apiRoutes';

export const Home = (): JSX.Element => {
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: 700, flexGrow: 1 }}>
          <HomeTable isLoading={isLoading} forms={lastForms} />
        </Box>
      </Box>
    </Box>
  );
};
