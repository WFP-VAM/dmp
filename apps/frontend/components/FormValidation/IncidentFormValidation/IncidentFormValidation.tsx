/* eslint-disable max-lines */
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  DisasterType,
  formatCommonFields,
  INCIDENT,
  IncidentDto,
  incidentSpecificKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { mapValues, pick } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { RegionFilters } from 'components/Filters/RegionFilters';
import { usePatchForm } from 'services/api/kobo/usePatchForm';
import { formatFormToRaw } from 'utils/formatFormToRaw';

import { DisasterSelect } from '../DisasterSelect';
import { IncidentFormType } from './IncidentFormType';
import { IncidentTables } from './IncidentTables';

const minWidth = 240;

export const IncidentFormValidation = ({
  validationForm,
}: {
  validationForm: IncidentDto;
}): JSX.Element => {
  const router = useRouter();
  const { disasterType, id } = router.query;

  const intl = useIntl();
  const formattedForm = useMemo(
    () => ({
      ...formatCommonFields(validationForm),
      ...mapValues(incidentSpecificKeys, value => validationForm[value]),
    }),
    [validationForm],
  );
  const { control, handleSubmit, reset } = useForm<IncidentFormType>({
    defaultValues: {
      region: {
        province: formattedForm.province,
        district: formattedForm.district,
        commune: formattedForm.commune,
      },
      interviewer: formattedForm.reportName,
      disTyp: formattedForm.disasterType,
      phone: formattedForm.phone,
      reportDate: dayjs(formattedForm.entryDate, 'YYYY-MM-DD'),
      incidentDate: dayjs(formattedForm.disasterDate, 'YYYY-MM-DD'),
      specific: pick(
        formattedForm,
        Object.keys(
          incidentSpecificKeys,
        ) as (keyof typeof incidentSpecificKeys)[],
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

  useEffect(() => {
    if (shouldReset) {
      reset();
      setShouldReset(false);
    }
  }, [shouldReset, reset]);

  const onSubmit = (data: IncidentFormType) => {
    const triggerAndUpdateDefault = async () => {
      try {
        const status = await trigger(
          formatFormToRaw(data, koboKeys[INCIDENT], incidentSpecificKeys),
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
        name="specific"
        control={control}
        render={({ field: { value, onChange } }) => (
          <IncidentTables
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
