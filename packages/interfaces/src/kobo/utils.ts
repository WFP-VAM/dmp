import * as path from 'path';

import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { IncidentDto } from './IncidentDto';
import { DisasterDtoType, DROUGHT, FLOOD, INCIDENT } from './constants';
import { koboKeys } from './mapping';

export const computeDisasterTypeFromDistTyp = (distTyp: string) => {
  if (isNaN(parseInt(distTyp))) throw Error('distTyp must be convertable to integer');

  if (distTyp === '1') return FLOOD;
  if (distTyp === '2') return DROUGHT;

  return INCIDENT;
};

export const isFlood = (form: DisasterDtoType): form is FloodDto => {
  return koboKeys[FLOOD].disTyp in form;
};
export const isDrought = (form: DisasterDtoType): form is DroughtDto => {
  return koboKeys[DROUGHT].disTyp in form;
};

export const isFloodArray = (
  forms: FloodDto[] | DroughtDto[] | IncidentDto[],
): forms is FloodDto[] => {
  return koboKeys[FLOOD].disTyp in forms[0];
};

export const isDroughtArray = (
  forms: FloodDto[] | DroughtDto[] | IncidentDto[],
): forms is DroughtDto[] => {
  return koboKeys[FLOOD].disTyp in forms[0];
};

export const formatCommonFields = (form: DisasterDtoType) => {
  if (isFlood(form)) {
    const keys = koboKeys[FLOOD];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
      entryDate: form[keys.entryDate],
      id: form[keys.id],
      approvalLink: path.join('/form', FLOOD, form[keys.id].toString()),
    };
  } else if (isDrought(form)) {
    const keys = koboKeys[DROUGHT];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
      entryDate: form[keys.entryDate],
      id: form[keys.id],
      approvalLink: path.join('/form', DROUGHT, form[keys.id].toString()),
    };
  } else {
    const keys = koboKeys[INCIDENT];

    return {
      province: form[keys.province],
      district: form[keys.district],
      commune: form[keys.commune],
      disasterDate: form[keys.disasterDate],
      disasterType: form[keys.disTyp],
      reportName: form[keys.entryName],
      phone: form[keys.phone],
      entryDate: form[keys.entryDate],
      id: form[keys.id],
      approvalLink: path.join('/form', INCIDENT, form[keys.id].toString()),
    };
  }
};
