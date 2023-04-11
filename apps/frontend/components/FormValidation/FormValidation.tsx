import { DisasterDtoType, isDrought, isFlood } from '@wfp-dmp/interfaces';

import { DroughtFormValidation } from './DroughtFormValidation/DroughtFormValidation';
import { FloodFormValidation } from './FloodFormValidation/FloodFormValidation';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType;
}): JSX.Element => {
  if (isFlood(validationForm))
    return <FloodFormValidation validationForm={validationForm} />;

  if (isDrought(validationForm))
    return <DroughtFormValidation validationForm={validationForm} />;

  // incident
  return <div>WIP</div>;
};
