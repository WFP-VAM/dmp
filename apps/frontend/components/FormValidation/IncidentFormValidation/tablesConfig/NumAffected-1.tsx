import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.NumVillAff, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumPeoAff, INCIDENT, 65),
  getColumnSetup(IncidentSpecific.NumFamAff, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumFeAff, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumDeathTo, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumMeDeath, INCIDENT, 50),
  getColumnSetup(IncidentSpecific.NumFeDeath, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumKidDeath, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumOldDeath, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumDisDeath, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.ToNumMising, INCIDENT, 65),
  getColumnSetup(IncidentSpecific.NumMeMising, INCIDENT, 50),
  getColumnSetup(IncidentSpecific.NumFeMising, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumKidMising, INCIDENT, 70),
  getColumnSetup(IncidentSpecific.NumOldMising, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumDisMising, INCIDENT, 65),
  getColumnSetup(IncidentSpecific.ToNumInjure, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumMeInjure, INCIDENT, 50),
  getColumnSetup(IncidentSpecific.NumFeInjure, INCIDENT, 60),
  getColumnSetup(IncidentSpecific.NumKidInjure, INCIDENT, 65),
  getColumnSetup(IncidentSpecific.NumOldInjure, INCIDENT, 55),
  getColumnSetup(IncidentSpecific.NumDisInjure, INCIDENT, 70),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', INCIDENT),
    children: [
      { field: IncidentSpecific.NumVillAff },
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
    ],
  },
];

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
};
