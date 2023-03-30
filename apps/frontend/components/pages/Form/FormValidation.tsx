import { Box, Skeleton } from '@mui/material';
import { DisasterType } from '@wfp-dmp/interfaces';
import { formatForm } from '@wfp-dmp/interfaces/dist/kobo/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { RegionFilters } from 'components/Filters/RegionFilters';
import { useGetForm } from 'services/api/kobo/useGetForm';

export const FormValidation = (): JSX.Element => {
  const router = useRouter();
  const { disasterType, id } = router.query;
  const { data: form, isLoading } = useGetForm(
    disasterType as DisasterType,
    id as string,
  );

  const formattedForm = useMemo(() => formatForm(form), [form]);
  const { control, reset } = useForm({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
    },
  });
  useEffect(() => {
    reset({
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
    });
  }, [formattedForm, reset]);

  return (
    <form>
      <Box>{JSON.stringify(form)}</Box>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Controller
          name="region"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RegionFilters value={value} onChange={onChange} />
          )}
        />
      )}
    </form>
  );
};
