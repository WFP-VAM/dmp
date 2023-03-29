import { Box } from '@mui/material';
import { DisasterType } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';

import { useGetForm } from 'services/api/kobo/useGetForm';

export const FormValidation = (): JSX.Element => {
  const router = useRouter();
  const { disasterType, id } = router.query;
  const form = useGetForm(disasterType as DisasterType, id as string);

  return <Box>{JSON.stringify(form)}</Box>;
};
