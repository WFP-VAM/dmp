import { Box } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import Link from 'next/link';
import useSWR from 'swr';

import { TableDisplay } from 'components/TableDisplay';
import { ApiRoutes } from 'services/api/apiRoutes';
import { useGetMe } from 'services/api/user/useUser';

export const Home = (): JSX.Element => {
  const user = useGetMe();
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );

  return (
    <Box>
      {user && (
        <>
          <h1>
            Welcome {user.name} to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <Link href="/profile">
            <h2>Update your profile</h2>
          </Link>
        </>
      )}
      <TableDisplay isLoading={isLoading} forms={lastForms} />
    </Box>
  );
};
