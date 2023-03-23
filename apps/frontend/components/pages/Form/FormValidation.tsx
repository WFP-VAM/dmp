import { Box } from '@mui/material';
import { DisasterType } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { useForm } from 'services/api/kobo/useForm';

export const FormValidation = (): ReactElement => {
  const router = useRouter();
  const { disasterType, id } = router.query;
  const form = useForm(disasterType as DisasterType, id as string);

  return <Box>{JSON.stringify(form)}</Box>;
};
