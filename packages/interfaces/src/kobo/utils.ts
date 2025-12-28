import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { IncidentDto } from './IncidentDto';
import { ValidationStatusValue } from './ValidationStatusDto';
import { DisasterDtoType, DROUGHT, FLOOD, INCIDENT } from './constants';
import { KoboCommonKeys, koboKeys } from './mapping';

export const computeDisasterTypeFromDistTyp = (distTyp: string) => {
  if (isNaN(parseInt(distTyp))) throw Error('distTyp must be convertable to integer');

  if (distTyp === '1') return FLOOD;
  if (distTyp === '2') return DROUGHT;

  return INCIDENT;
};

export const computeDisasterTypeFromDistTyps = (disTyps: string[]) => {
  // the disaters type: flood, drought and incident are in three different assets in Kobo
  // for now the  disater list can contain multiple elements only if it is incident
  // all the elements of the list are from the same disaster type
  // so to find the disaster type we check only the first element for now
  return computeDisasterTypeFromDistTyp(disTyps[0]);
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
  return koboKeys[DROUGHT].disTyp in forms[0];
};

export const formatCommonFields = (form: DisasterDtoType) => {
  if (isFlood(form)) {
    const keys = koboKeys[FLOOD];

    return {
      [KoboCommonKeys.province]: form[keys.province],
      [KoboCommonKeys.district]: form[keys.district],
      [KoboCommonKeys.commune]: form[keys.commune],
      [KoboCommonKeys.village]: form[keys.village],
      [KoboCommonKeys.disasterDate]: form[keys.disasterDate],
      [KoboCommonKeys.disTyp]: form[keys.disTyp],
      [KoboCommonKeys.entryName]: form[keys.entryName],
      [KoboCommonKeys.phone]: form[keys.phone],
      [KoboCommonKeys.entryDate]: form[keys.entryDate],
      [KoboCommonKeys.id]: form[keys.id].toString(),
      [KoboCommonKeys.validationStatus]: (
        form[keys.validationStatus]?.uid ?? ValidationStatusValue.onHold
      ).toString(),
      [KoboCommonKeys.submissionTime]: form[keys.submissionTime],
      floodN: form[keys.floodN],
      approvalLink: `/form?disaster=${FLOOD}&formId=${form[keys.id].toString()}`,
    };
  } else if (isDrought(form)) {
    const keys = koboKeys[DROUGHT];

    return {
      [KoboCommonKeys.province]: form[keys.province],
      [KoboCommonKeys.district]: form[keys.district],
      [KoboCommonKeys.commune]: form[keys.commune],
      [KoboCommonKeys.village]: form[keys.village],
      [KoboCommonKeys.disasterDate]: form[keys.disasterDate],
      [KoboCommonKeys.disTyp]: form[keys.disTyp],
      [KoboCommonKeys.entryName]: form[keys.entryName],
      [KoboCommonKeys.phone]: form[keys.phone],
      [KoboCommonKeys.entryDate]: form[keys.entryDate],
      [KoboCommonKeys.id]: form[keys.id].toString(),
      [KoboCommonKeys.validationStatus]: (
        form[keys.validationStatus]?.uid ?? ValidationStatusValue.onHold
      ).toString(),
      [KoboCommonKeys.submissionTime]: form[keys.submissionTime],
      approvalLink: `/form?disaster=${DROUGHT}&formId=${form[keys.id].toString()}`,
    };
  } else {
    const keys = koboKeys[INCIDENT];

    return {
      [KoboCommonKeys.province]: form[keys.province],
      [KoboCommonKeys.district]: form[keys.district],
      [KoboCommonKeys.commune]: form[keys.commune],
      [KoboCommonKeys.village]: form[keys.village],
      [KoboCommonKeys.disasterDate]: form[keys.disasterDate],
      [KoboCommonKeys.disTyp]: form[keys.disTyp],
      [KoboCommonKeys.entryName]: form[keys.entryName],
      [KoboCommonKeys.phone]: form[keys.phone],
      [KoboCommonKeys.entryDate]: form[keys.entryDate],
      [KoboCommonKeys.id]: form[keys.id].toString(),
      [KoboCommonKeys.validationStatus]: (
        form[keys.validationStatus]?.uid ?? ValidationStatusValue.onHold
      ).toString(),
      [KoboCommonKeys.submissionTime]: form[keys.submissionTime],
      approvalLink: `/form?disaster=${INCIDENT}&formId=${form[keys.id].toString()}`,
    };
  }
};
