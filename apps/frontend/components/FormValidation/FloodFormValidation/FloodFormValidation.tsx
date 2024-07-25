/* eslint-disable max-lines */
import { PhoneAndroid } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  DisasterType,
  FLOOD,
  FloodDto,
  FloodSpecific,
  floodSpecificKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { RegionFilters } from 'components/Filters/RegionFilters';
import { usePatchForm } from 'services/api/kobo/usePatchForm';
import { colors } from 'theme/muiTheme';
import { formatFormToRaw } from 'utils/formatFormToRaw';
import { formatFloodFields } from 'utils/formatRawToForm';

import { DisasterSelect } from '../DisasterSelect';
import { FloodFormType } from './FloodFormType';
import { FloodTables } from './FloodTables';

export const FloodFormValidation = ({
  validationForm,
}: {
  validationForm: FloodDto;
}): JSX.Element => {
  const theme = useTheme();
  const router = useRouter();
  const { disasterType, id } = router.query;

  const formattedForm = useMemo(
    () => formatFloodFields(validationForm),
    [validationForm],
  );
  const { control, handleSubmit, reset } = useForm<FloodFormType>({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
      interviewer: formattedForm.entryName,
      disTyp: formattedForm.disTyp,
      phone: formattedForm.phone,
      reportDate: dayjs(formattedForm.entryDate, 'YYYY-MM-DD'),
      incidentDate: dayjs(formattedForm.disasterDate, 'YYYY-MM-DD'),
      specific: pick(
        formattedForm,
        Object.keys(floodSpecificKeys) as (keyof typeof floodSpecificKeys)[],
      ),
    },
  });

  const { trigger, isMutating } = usePatchForm(
    disasterType as DisasterType,
    id as string,
  );

  const [isEditMode, setIsEditMode] = useState(false);
  // We set this state to avoid race condition between a field update and the reset coming from react hook form
  const [shouldReset, setShouldReset] = useState(false);

  console.log({ isEditMode });
  useEffect(() => {
    if (shouldReset) {
      reset();
      setShouldReset(false);
    }
  }, [shouldReset, reset]);

  const onSubmit = (data: FloodFormType) => {
    const triggerAndUpdateDefault = async () => {
      try {
        const status = await trigger(
          formatFormToRaw(data, koboKeys[FLOOD], floodSpecificKeys),
        );
        if (status === 201) {
          reset(data);
          setIsEditMode(false);
        }
      } catch (error) {
        setShouldReset(true);
        console.error(error);
      }
    };
    void triggerAndUpdateDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={theme.spacing(2)}>
        <Stack direction="row" gap={theme.spacing(4)}>
          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <Typography color={colors.gray2}>
              <FormattedMessage id="validation_search_params.location" />
            </Typography>
            <Controller
              name="region"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RegionFilters
                  value={{
                    province: [value.province],
                    district: [value.district],
                    commune: [value.commune],
                  }}
                  onChange={onChange}
                  disableAll={!isEditMode}
                />
              )}
            />
          </Stack>
          <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
            <Typography width="3rem" color={colors.gray2}>
              <FormattedMessage id="forms_table.headers.entry_date" />
            </Typography>
            <Controller
              name="reportDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  disabled={!isEditMode}
                  value={value}
                  onChange={onChange}
                  sx={{ width: 150 }}
                  slotProps={{
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
            <Typography width="5rem" color={colors.gray2}>
              <FormattedMessage id="forms_table.headers.dis_date" />
            </Typography>
            <Controller
              name="incidentDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  disabled={!isEditMode}
                  value={value}
                  onChange={onChange}
                  sx={{ width: 150 }}
                  slotProps={{
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={theme.spacing(4)}
          justifyContent="space-between"
        >
          <Stack direction="row" gap={theme.spacing(5)}>
            <Controller
              name="disTyp"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DisasterSelect
                  disabled={!isEditMode}
                  value={value}
                  onChange={onChange}
                  showLabel={false}
                />
              )}
            />
            <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
              <Typography width="5rem" color={colors.gray2}>
                <FormattedMessage id="table.FLOOD.floodN" />
              </Typography>
              <Controller
                name="specific"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={!isEditMode}
                    type="number"
                    value={value.floodN}
                    sx={{ width: 75 }}
                    onChange={event =>
                      onChange({
                        ...value,
                        [FloodSpecific.floodN]: event.target.value,
                      })
                    }
                  />
                )}
              />
            </Stack>
            <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
              <Typography width="5rem" color={colors.gray2}>
                <FormattedMessage id="forms_table.headers.entry_name" />
              </Typography>
              <Controller
                name="interviewer"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={!isEditMode}
                    value={value}
                    onChange={onChange}
                    sx={{ width: 200 }}
                  />
                )}
              />
            </Stack>
            <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
              <Typography width="5rem" color={colors.gray2}>
                <FormattedMessage id="forms_table.headers.phone" />
              </Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroid />
                        </InputAdornment>
                      ),
                    }}
                    disabled={!isEditMode}
                    type="tel"
                    value={value}
                    onChange={onChange}
                    sx={{ width: 200 }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Controller
        name="specific"
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
            sx={{ color: 'black', margin: 2, border: '1px solid black' }}
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            <FormattedMessage id="form_page.edit" />
          </Button>
        )}
        {isEditMode && (
          <>
            <Button
              type="submit"
              sx={{ color: 'white', margin: 2 }}
              disabled={isMutating}
              endIcon={
                isMutating ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              <FormattedMessage id="form_page.submit" />
            </Button>
            <Button
              sx={{ color: 'white', margin: 2 }}
              onClick={() => {
                setIsEditMode(false);
                setShouldReset(true);
              }}
              disabled={isMutating}
              endIcon={
                isMutating ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              <FormattedMessage id="form_page.cancel" />
            </Button>
          </>
        )}
      </Box>
    </form>
  );
};
