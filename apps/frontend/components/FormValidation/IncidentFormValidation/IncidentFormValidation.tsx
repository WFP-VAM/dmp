/* eslint-disable max-lines */
import { Stack, useTheme } from '@mui/material';
import {
  DisasterType,
  INCIDENT,
  IncidentDto,
  incidentSpecificKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { usePatchForm } from 'services/api/kobo/usePatchForm';
import { formatFormToRaw } from 'utils/formatFormToRaw';
import { formatIncidentFields } from 'utils/formatRawToForm';
import { reloadPage } from 'utils/reloadPage';

import { useShowFormUpdateError } from '../FormUpdateError';
import FormValidationFooter from '../FormValidationFooter';
import FormValidationHeader from '../FormValidationHeader';
import { IncidentFormType } from './IncidentFormType';
import { IncidentTables } from './IncidentTables';

export const IncidentFormValidation = ({
  validationForm,
}: {
  validationForm: IncidentDto;
}): JSX.Element => {
  const theme = useTheme();
  const router = useRouter();
  const showFormUpdateError = useShowFormUpdateError();
  const { disaster: disasterType, formId: id } = router.query;

  const formattedForm = useMemo(
    () => formatIncidentFields(validationForm),
    [validationForm],
  );
  const { control, handleSubmit, reset } = useForm<IncidentFormType>({
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
  const [isSaving, setIsSaving] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    if (shouldReset) {
      reset();
      setShouldReset(false);
    }
  }, [shouldReset, reset]);

  const onSubmit = async (data: IncidentFormType) => {
    if (!isEditMode) {
      return;
    }

    setIsSaving(true);
    try {
      const status = await trigger(
        formatFormToRaw(data, koboKeys[INCIDENT], incidentSpecificKeys),
      );
      if (status === 201) {
        setIsEditMode(false);
        // Reload current page to refresh form data and prevent navigation issues
        reloadPage(router);

        return;
      }
    } catch (error) {
      setShouldReset(true);
      showFormUpdateError(error);
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={theme.spacing(6)}>
        <FormValidationHeader
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          control={control as any}
          isEditMode={isEditMode}
        />
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
        <FormValidationFooter
          isEditMode={isEditMode}
          isFormMutating={isSaving || isMutating}
          setIsEditMode={setIsEditMode}
          status={validationForm._validation_status.uid}
        />
      </Stack>
    </form>
  );
};
