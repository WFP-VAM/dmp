import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup({ field: IncidentSpecific.NumVillAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumPeoAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFamAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDeathTo, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumMeDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumKidDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumOldDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDisDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.ToNumMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumMeMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumKidMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumOldMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDisMising, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.ToNumInjure, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumMeInjure, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeInjure, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumKidInjure, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumOldInjure, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDisInjure, disaster: INCIDENT }),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
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

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: INCIDENT,
  additionalChildren: [{ field: IncidentSpecific.NumVillAff }],
};

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
  groupParams,
};
