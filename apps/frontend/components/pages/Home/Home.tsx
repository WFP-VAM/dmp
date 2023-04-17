import { Box, Typography } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import { forwardRef, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactToPrint from 'react-to-print';
import useSWR from 'swr';

import { TableDisplay } from 'components/TableDisplay';
import { ApiRoutes } from 'services/api/apiRoutes';
import { useGetMe } from 'services/api/user/useUser';

// eslint-disable-next-line react/display-name
const PrintMe = forwardRef(
  (
    props: { isLoading: boolean; forms: DisasterDtoType[] | undefined },
    ref,
  ) => {
    return (
      <Box ref={ref}>
        <TableDisplay isLoading={props.isLoading} forms={props.forms} />
      </Box>
    );
  },
);

export const Home = (): JSX.Element => {
  const user = useGetMe();
  const { data: lastForms, isLoading } = useSWR<DisasterDtoType[]>(
    ApiRoutes.lastForms,
  );
  const componentRef = useRef(null);

  return (
    <Box>
      {user && (
        <>
          <Typography variant="h3" mb={5}>
            <FormattedMessage id="navigation.banner" />
          </Typography>
        </>
      )}
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />

      <PrintMe ref={componentRef} isLoading={isLoading} forms={lastForms} />
    </Box>
  );
};
