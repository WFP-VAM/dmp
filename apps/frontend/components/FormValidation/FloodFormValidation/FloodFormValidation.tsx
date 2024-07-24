import { Box, Button, CircularProgress, Stack, useTheme } from '@mui/material';
import {
  DisasterType,
  FLOOD,
  FloodDto,
  floodSpecificKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { usePatchForm } from 'services/api/kobo/usePatchForm';
import { formatFormToRaw } from 'utils/formatFormToRaw';
import { formatFloodFields } from 'utils/formatRawToForm';

import { FloodFormType } from './FloodFormType';
import FloodHeader from './FloodHeader';
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
      <Stack gap={theme.spacing(6)}>
        <FloodHeader control={control} isEditMode={isEditMode} />
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
      </Stack>
    </form>
  );
};
