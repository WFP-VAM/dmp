import { Stack, useTheme } from '@mui/material';
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

import { usePatchForm } from 'services/api/kobo/usePatchForm';
import { formatFormToRaw } from 'utils/formatFormToRaw';
import { formatFloodFields } from 'utils/formatRawToForm';

import FormValidationFooter from '../FormValidationFooter';
import FormValidationHeader from '../FormValidationHeader';
import { FloodCheckBoxes } from './FloodCheckBoxes';
import { FloodFormType } from './FloodFormType';
import { FloodTables } from './FloodTables';

export const FloodFormValidation = ({
  validationForm,
}: {
  validationForm: FloodDto;
}): JSX.Element => {
  const theme = useTheme();
  const router = useRouter();
  const { disaster: disasterType, formId: id } = router.query;

  const formattedForm = useMemo(
    () => formatFloodFields(validationForm),
    [validationForm],
  );
  const { control, handleSubmit, reset } = useForm<FloodFormType>({
    defaultValues: {
      region: {
        province: [formattedForm.province],
        district: [formattedForm.district],
        commune: [formattedForm.commune],
        village: formattedForm.village,
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

  const { trigger } = usePatchForm(disasterType as DisasterType, id as string);

  const [isEditMode, setIsEditMode] = useState(false);
  // We set this state to avoid race condition between a field update and the reset coming from react hook form
  const [shouldReset, setShouldReset] = useState(false);

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
        <FormValidationHeader
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          control={control as any}
          isEditMode={isEditMode}
          isFloodType
        />
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
        <Controller
          name="specific"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FloodCheckBoxes
              onChange={onChange}
              value={value}
              isEditable={isEditMode}
            />
          )}
        />
        <FormValidationFooter
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          status={validationForm._validation_status.uid}
        />
      </Stack>
    </form>
  );
};
