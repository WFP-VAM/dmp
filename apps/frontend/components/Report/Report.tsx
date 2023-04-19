import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  isDroughtArray,
  isFloodArray,
} from '@wfp-dmp/interfaces';

import { FloodReport } from './FloodReport/FloodReport';

export const Report = ({
  forms,
}: {
  forms: FloodDto[] | DroughtDto[] | IncidentDto[];
}) => {
  if (forms.length === 0) return null;

  if (isFloodArray(forms)) return <FloodReport forms={forms} />;

  if (isDroughtArray(forms)) return <div>WIP DROUGHT</div>;

  return <div>WIP INCIDENT</div>;
};
