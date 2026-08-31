import { DisasterDtoType, isDrought, isFlood } from '@wfp-dmp/interfaces';

import { DroughtFormValidation } from './DroughtFormValidation/DroughtFormValidation';
import { FloodFormValidation } from './FloodFormValidation/FloodFormValidation';
import { FormUpdateErrorProvider } from './FormUpdateError';
import { IncidentFormValidation } from './IncidentFormValidation/IncidentFormValidation';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType;
}): JSX.Element => {
  let form: JSX.Element;
  if (isFlood(validationForm)) {
    form = <FloodFormValidation validationForm={validationForm} />;
  } else if (isDrought(validationForm)) {
    form = <DroughtFormValidation validationForm={validationForm} />;
  } else {
    form = <IncidentFormValidation validationForm={validationForm} />;
  }

  return <FormUpdateErrorProvider>{form}</FormUpdateErrorProvider>;
};
