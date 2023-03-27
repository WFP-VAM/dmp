import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { IncidentDto } from './IncidentDto';

export const FLOOD = 'FLOOD';
export const DROUGHT = 'DROUGHT';
export const INCIDENT = 'INCIDENT';

export type DisasterType = typeof FLOOD | typeof DROUGHT | typeof INCIDENT;
export type DisasterDtosType = (FloodDto | DroughtDto | IncidentDto)[];

interface MappingTypes {
  [key: string]: string;
}

export const DisasterMapping: MappingTypes = {
  flood: '1',
  drought: '2',
};

export const IncidentMapping: MappingTypes = {
  hurricane: '3',
  fire: '4',
  lightning: '5',
  epidemics: '6',
  shorebreak: '7',
  insects: '8',
  traffic_accident: '9',
  drowning: '10',
  collapse: '11',
  weapon: '12',
  other: '99',
};
