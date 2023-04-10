import { Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  FloodDto,
  floodSpecificKeys,
  formatCommonFields,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { mapValues, pick } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { RegionFilters } from 'components/Filters/RegionFilters';

import { DisasterSelect } from '../DisasterSelect';
import { FloodTables } from './FloodTables';

const minWidth = 240;

export const FloodFormValidation = ({
  validationForm,
}: {
  validationForm: FloodDto;
}): JSX.Element => {
  const intl = useIntl();
  const formattedForm = useMemo(
    () => ({
      ...formatCommonFields(validationForm),
      ...mapValues(floodSpecificKeys, value => validationForm[value]),
    }),
    [validationForm],
  );
  const { control, handleSubmit, reset } = useForm({
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
      floodSpecific: pick(
        formattedForm,
        Object.keys(floodSpecificKeys),
      ) as Record<keyof typeof floodSpecificKeys, string | undefined>,
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    reset();
  }, [isEditMode, reset]);

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <FloodTables
            value={value}
            onChange={onChange}
            isEditMode={isEditMode}
          />
        )}
      />
      <Box display="flex" justifyContent="center">
        {!isEditMode && (
          <Button
            sx={{ color: 'white', margin: 2 }}
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            <FormattedMessage id="form_page.edit" />
          </Button>
        )}
        {isEditMode && (
          <>
            <Button type="submit" sx={{ color: 'white', margin: 2 }}>
              <FormattedMessage id="form_page.submit" />
            </Button>
            <Button
              sx={{ color: 'white', margin: 2 }}
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              <FormattedMessage id="form_page.cancel" />
            </Button>
          </>
        )}
      </Box>
    </form>
  );
};
