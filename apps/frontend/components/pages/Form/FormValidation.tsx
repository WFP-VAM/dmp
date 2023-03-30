import { Box, Skeleton } from '@mui/material';
import {
  DisasterDtoType,
  DisasterType,
  DROUGHT,
  FLOOD,
  INCIDENT,
  koboKeys,
} from '@wfp-dmp/interfaces';
import { isDrought, isFlood } from '@wfp-dmp/interfaces/dist/kobo/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { RegionFilters } from 'components/Filters/RegionFilters';
import { useGetForm } from 'services/api/kobo/useGetForm';

const formatForm = (form: DisasterDtoType | undefined) => {
  if (form === undefined) {
    return {
      province: '',
      district: '',
      commune: '',
      disasterDate: '',
      disasterType: '',
      type: '',
      reportName: '',
      phone: '',
      entryDate: '',
    };
  }
  if (isFlood(form)) {
    const keys = koboKeys[FLOOD];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      type: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
      entryDate: form[keys.entryDate],
    };
  } else if (isDrought(form)) {
    const keys = koboKeys[DROUGHT];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      type: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
      entryDate: form[keys.entryDate],
    };
  } else {
    const keys = koboKeys[INCIDENT];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      type: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
    };
  }
};

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
