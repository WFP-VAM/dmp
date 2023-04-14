import { mapValues, reduce } from 'lodash';
import * as path from 'path';

import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { DisasterDtoType, DROUGHT, FLOOD, INCIDENT } from './constants';
import { FloodSpecific, floodSpecificKeys, koboKeys } from './mapping';

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

const formatFloodCheckboxes = (threats: undefined | string) => {
  if (threats === undefined) {
    return {};
  } else {
    const threatsArr = threats.split(' ');

    return reduce(
      threatsArr,
      (obj: { [x: string]: boolean }, threat: string) => {
        obj[threat] = true;

        return obj;
      },
      {},
    );
  }
};

export const formatFloodSpecificFields = (form: FloodDto) => {
  const key = floodSpecificKeys[FloodSpecific.threat];
  const threats = form[key];

  const checkboxes = formatFloodCheckboxes(threats);

  const floodSpecificFields = {
    ...mapValues(floodSpecificKeys, (value) => form[value]),
    [FloodSpecific.threat]: checkboxes,
  };

  return { floodSpecific: floodSpecificFields };
};
