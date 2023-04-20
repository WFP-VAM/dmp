import {
  DroughtDto,
  droughtSpecificKeys,
  FloodDto,
  floodSpecificKeys,
  formatCommonFields,
  IncidentDto,
  incidentSpecificKeys,
} from '@wfp-dmp/interfaces';
import { mapValues } from 'lodash';

export const formatFloodFields = (
  form: FloodDto,
): Record<string, string | number | undefined> => ({
  ...formatCommonFields(form),
  ...mapValues(floodSpecificKeys, value => form[value]),
});

export const formatDroughtFields = (form: DroughtDto) => ({
  ...formatCommonFields(form),
  ...mapValues(droughtSpecificKeys, value => form[value] ?? ''),
});

export const formatIncidentFields = (form: IncidentDto) => ({
  ...formatCommonFields(form),
  ...mapValues(incidentSpecificKeys, value => form[value]),
});
