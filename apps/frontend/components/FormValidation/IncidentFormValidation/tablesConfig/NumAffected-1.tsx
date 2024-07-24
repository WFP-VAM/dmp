import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  INCIDENT,
  IncidentSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.NumVillAff, INCIDENT),
  getColumnSetup(IncidentSpecific.NumPeoAff, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFamAff, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeAff, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDeathTo, INCIDENT),
  getColumnSetup(IncidentSpecific.NumMeDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.NumKidDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.NumOldDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDisDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.ToNumMising, INCIDENT),
  getColumnSetup(IncidentSpecific.NumMeMising, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeMising, INCIDENT),
  getColumnSetup(IncidentSpecific.NumKidMising, INCIDENT),
  getColumnSetup(IncidentSpecific.NumOldMising, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDisMising, INCIDENT),
  getColumnSetup(IncidentSpecific.ToNumInjure, INCIDENT),
  getColumnSetup(IncidentSpecific.NumMeInjure, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeInjure, INCIDENT),
  getColumnSetup(IncidentSpecific.NumKidInjure, INCIDENT),
  getColumnSetup(IncidentSpecific.NumOldInjure, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDisInjure, INCIDENT),
];

const NumAffected1ColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('victimsAffected', INCIDENT, 'start'),
    children: [
      ...(detailed
        ? [{ field: KoboCommonKeys.location }]
        : [
            { field: KoboCommonKeys.province },
            { field: KoboCommonKeys.district },
            { field: KoboCommonKeys.commune },
          ]),
      { field: IncidentSpecific.NumVillAff },
    ],
  },
  {
    ...getGroupSetup('totalAffected', INCIDENT),
    children: [
      { field: IncidentSpecific.NumPeoAff },
      { field: IncidentSpecific.NumFamAff },
      { field: IncidentSpecific.NumFeAff },
    ],
  },
  {
    ...getGroupSetup('deathToll', INCIDENT),
    children: [
      { field: IncidentSpecific.NumDeathTo },
      { field: IncidentSpecific.NumMeDeath },
      { field: IncidentSpecific.NumFeDeath },
      { field: IncidentSpecific.NumKidDeath },
      { field: IncidentSpecific.NumOldDeath },
      { field: IncidentSpecific.NumDisDeath },
    ],
  },
  {
    ...getGroupSetup('missing', INCIDENT),
    children: [
      { field: IncidentSpecific.ToNumMising },
      { field: IncidentSpecific.NumMeMising },
      { field: IncidentSpecific.NumFeMising },
      { field: IncidentSpecific.NumKidMising },
      { field: IncidentSpecific.NumOldMising },
      { field: IncidentSpecific.NumDisMising },
    ],
  },
  {
    ...getGroupSetup('injured', INCIDENT),
    children: [
      { field: IncidentSpecific.ToNumInjure },
      { field: IncidentSpecific.NumMeInjure },
      { field: IncidentSpecific.NumFeInjure },
      { field: IncidentSpecific.NumKidInjure },
      { field: IncidentSpecific.NumOldInjure },
      { field: IncidentSpecific.NumDisInjure },
    ],
  },
];

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
};
