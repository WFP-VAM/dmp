import { Skeleton } from '@mui/material';
import { DisasterType } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';

import { FormValidation } from 'components/FormValidation/FormValidation';
import { useGetForm } from 'services/api/kobo/useGetForm';

export const FormValidationContainer = (): JSX.Element => {
  const router = useRouter();
  const { disaster, formId } = router.query;
  const { data: form, isLoading } = useGetForm(
    disaster as DisasterType,
    formId as string,
  );

  return isLoading || form === undefined ? (
    <Skeleton sx={{ minWidth: 800, minHeight: 600 }} />
  ) : (
    <FormValidation validationForm={form} />
  );
};
