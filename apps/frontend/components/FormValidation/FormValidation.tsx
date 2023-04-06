import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DisasterDtoType, FloodDto, formatForm } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { RegionFilters } from 'components/Filters/RegionFilters';
import { DisasterSelect } from 'components/FormValidation/DisasterSelect';

import { A1FloodTable } from './FloodTables';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType;
}): JSX.Element => {
  const intl = useIntl();

  const formattedForm = useMemo(
    () => formatForm(validationForm),
    [validationForm],
  );
  const { control, handleSubmit } = useForm({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
      interviewer: formattedForm.reportName,
      disTyp: formattedForm.disasterType,
      phone: formattedForm.phone,
      reportDate: dayjs(new Date(formattedForm.entryDate)),
      incidentDate: dayjs(new Date(formattedForm.disasterDate)),
      floodSpecific: {
        'g3/g4/TNumDeath': (validationForm as FloodDto)['g3/g4/TNumDeath'],
        'g3/g4/NumMeDeath': (validationForm as FloodDto)['g3/g4/NumMeDeath'],
        'g3/g4/NumFeDeath': (validationForm as FloodDto)['g3/g4/NumFeDeath'],
        'g3/g5/NumTMising': (validationForm as FloodDto)['g3/g5/NumTMising'],
      },
    },
  });

  const [isEditMode] = useState(false);
  const minWidth = 240;

  const submitHandler = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box display="flex" flexDirection="column" justifyContent={'center'}>
        <Box display="flex" flexDirection="row">
          <Box mr={7}>
            <Controller
              name="disTyp"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DisasterSelect
                  disabled={!isEditMode}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Controller
            name="region"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RegionFilters
                value={value}
                onChange={onChange}
                disableAll={!isEditMode}
              />
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
                  disabled={!isEditMode}
                  label={intl.formatMessage({
                    id: 'forms_table.headers.entry_name',
                  })}
                  value={value}
                  onChange={onChange}
                  sx={{ minWidth: minWidth }}
                />
              )}
            />
          </Box>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                disabled={!isEditMode}
                label={intl.formatMessage({
                  id: 'forms_table.headers.phone',
                })}
                type="number"
                value={value}
                onChange={onChange}
                sx={{ minWidth: minWidth }}
              />
            )}
          />
        </Box>
        <Box display="flex" flexDirection="row" sx={{ m: 2, mt: 5 }}>
          <Box mr={6}>
            <Controller
              name="reportDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  disabled={!isEditMode}
                  label={intl.formatMessage({
                    id: 'forms_table.headers.entry_date',
                  })}
                  value={value}
                  onChange={onChange}
                  sx={{ minWidth: minWidth }}
                />
              )}
            />
          </Box>
          <Controller
            name="incidentDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                disabled={!isEditMode}
                label={intl.formatMessage({
                  id: 'forms_table.headers.dis_date',
                })}
                value={value}
                onChange={onChange}
                sx={{ minWidth: minWidth }}
              />
            )}
          />
        </Box>
      </Box>
      <Controller
        name="floodSpecific"
        control={control}
        render={({ field: { value, onChange } }) => (
          <A1FloodTable value={value} onChange={onChange} />
        )}
      />
      <input type="submit" />
    </form>
  );
};
