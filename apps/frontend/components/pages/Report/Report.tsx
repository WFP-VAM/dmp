import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  isDroughtArray,
  isFloodArray,
} from '@wfp-dmp/interfaces';

export const Report = ({
  forms,
}: {
  forms: FloodDto[] | DroughtDto[] | IncidentDto[];
}) => {
  if (forms.length === 0) return null;

  if (isFloodArray(forms)) return <div>{JSON.stringify(forms)}</div>;

  if (isDroughtArray(forms)) return <div>WIP DROUGHT</div>;

  return <div>WIP INCIDENT</div>;
};
