import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { IncidentDto } from './IncidentDto';
import { DROUGHT, FLOOD, INCIDENT } from './constants';
import { koboKeys } from './keys';

export const computeDisasterTypeFromDistTyp = (distTyp: string) => {
  if (isNaN(parseInt(distTyp))) throw Error('distTyp must be convertable to integer');

  if (distTyp === '1') return FLOOD;
  if (distTyp === '2') return DROUGHT;

  return INCIDENT;
};

export const isFlood = (form: FloodDto | DroughtDto | IncidentDto): form is FloodDto => {
  return koboKeys[FLOOD].disTyp in form;
};
export const isDrought = (form: FloodDto | DroughtDto | IncidentDto): form is DroughtDto => {
  return koboKeys[DROUGHT].disTyp in form;
};
