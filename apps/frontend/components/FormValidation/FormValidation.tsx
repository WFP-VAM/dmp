import { Box, TextField } from '@mui/material';
import { DisasterDtoType } from '@wfp-dmp/interfaces';
import { formatForm } from '@wfp-dmp/interfaces/dist/kobo/utils';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { DisasterFilter } from 'components/Filters/DisasterFilter';
import { RegionFilters } from 'components/Filters/RegionFilters';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType | undefined;
}): JSX.Element => {
  const intl = useIntl();

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
      // reportDate: new Date(formattedForm.entryDate),
    },
  });
  console.log(control._formValues);

  return (
    <form>
      <Box display="flex" flexDirection="column" justifyContent={'center'}>
        <Box display="flex" flexDirection="row">
          <Box mr={7}>
            <Controller
              name="disTyp"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DisasterFilter value={value} onChange={onChange} />
              )}
            />
          </Box>
          <Controller
            name="region"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RegionFilters value={value} onChange={onChange} />
            )}
          />
        </Box>
        <Box display="flex" flexDirection="row" sx={{ m: 2, mt: 5 }}>
          <Box sx={{ mr: 6 }}>
            <Controller
              name="interviewer"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={intl.formatMessage({
                    id: 'forms_table.headers.entry_name',
                  })}
                  value={value}
                  onChange={onChange}
                  sx={{ minWidth: 260 }}
                />
              )}
            />
          </Box>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                label={intl.formatMessage({
                  id: 'forms_table.headers.phone',
                })}
                type="number"
                value={value}
                onChange={onChange}
                sx={{ minWidth: 260 }}
              />
            )}
          />
        </Box>
        {/* <Controller
          name="reportDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker label="Report Date" value={value} onChange={onChange} />
          )}
        /> */}
      </Box>
    </form>
  );
};
