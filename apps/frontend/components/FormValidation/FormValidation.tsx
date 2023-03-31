import { Box, TextField } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import { formatForm } from '@wfp-dmp/interfaces/dist/kobo/utils';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DisasterFilter } from 'components/Filters/DisasterFilter';
import { RegionFilters } from 'components/Filters/RegionFilters';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType | undefined;
}): JSX.Element => {
  const formattedForm = useMemo(
    () => formatForm(validationForm),
    [validationForm],
  );
  const { control } = useForm({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
      interviewer: formattedForm.reportName,
      disTyp: formattedForm.disasterType,
      phone: formattedForm.phone,
    },
  });

  return (
    <form>
      <Box display="flex" flexDirection="column">
        <Controller
          name="disTyp"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DisasterFilter value={value} onChange={onChange} />
          )}
        />
        <Controller
          name="region"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RegionFilters value={value} onChange={onChange} />
          )}
        />
        <Controller
          name="interviewer"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField type="number" value={value} onChange={onChange} />
          )}
        />
      </Box>
    </form>
  );
};
