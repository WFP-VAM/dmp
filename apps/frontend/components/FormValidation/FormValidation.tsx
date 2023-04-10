import { DisasterDtoType, isDrought, isFlood } from '@wfp-dmp/interfaces';

import { FloodFormValidation } from './FloodFormValidation/FloodFormValidation';

export const FormValidation = ({
  validationForm,
}: {
  validationForm: DisasterDtoType;
}): JSX.Element => {
  if (isFlood(validationForm))
    return <FloodFormValidation validationForm={validationForm} />;

  if (isDrought(validationForm)) return <div>WIP</div>;

  // incident
  return <div>WIP</div>;
};
