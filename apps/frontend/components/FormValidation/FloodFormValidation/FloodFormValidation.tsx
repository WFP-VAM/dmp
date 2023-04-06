import {
  FloodDto,
  floodSpecificKeys,
  formatCommonFields,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { mapValues, pick } from 'lodash';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CommonFormFields } from '../CommonFormFields';

export const FloodFormValidation = ({
  validationForm,
}: {
  validationForm: FloodDto;
}): JSX.Element => {
  const formattedForm = useMemo(
    () => ({
      ...formatCommonFields(validationForm),
      ...mapValues(floodSpecificKeys, value => validationForm[value]),
    }),
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
      reportDate: dayjs(new Date(formattedForm.entryDate)),
      incidentDate: dayjs(new Date(formattedForm.disasterDate)),
      ...pick(formattedForm, Object.keys(floodSpecificKeys)),
    },
  });

  const [isEditMode] = useState(false);

  return (
    <form>
      <CommonFormFields control={control} isEditMode={isEditMode} />
    </form>
  );
};
