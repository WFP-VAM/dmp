import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffectedColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NumVillAff, DROUGHT),
  getColumnSetup(DroughtSpecific.NumFamAff, DROUGHT),
  getColumnSetup(DroughtSpecific.NumPeoAff, DROUGHT),
  getColumnSetup(DroughtSpecific.NumMe, DROUGHT),
  getColumnSetup(DroughtSpecific.NumFe, DROUGHT),
  getColumnSetup(DroughtSpecific.NumKid, DROUGHT),
  getColumnSetup(DroughtSpecific.NumOld, DROUGHT),
  getColumnSetup(DroughtSpecific.NumDisMising, DROUGHT),
  getColumnSetup(DroughtSpecific.TNumDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumMeDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumFeDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumKidDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumOldDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumDisDeath, DROUGHT),
];

const NumAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('noWater', DROUGHT),
    children: [
      { field: DroughtSpecific.NumFamAff },
      { field: DroughtSpecific.NumPeoAff },
      { field: DroughtSpecific.NumMe },
      { field: DroughtSpecific.NumFe },
      { field: DroughtSpecific.NumKid },
      { field: DroughtSpecific.NumOld },
      { field: DroughtSpecific.NumDisMising },
    ],
  },
  {
    ...getGroupSetup('deathToll', DROUGHT),
    children: [
      { field: DroughtSpecific.TNumDeath },
      { field: DroughtSpecific.NumMeDeath },
      { field: DroughtSpecific.NumFeDeath },
      { field: DroughtSpecific.NumKidDeath },
      { field: DroughtSpecific.NumOldDeath },
      { field: DroughtSpecific.NumDisDeath },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: DROUGHT,
  additionalChildren: [{ field: DroughtSpecific.NumVillAff }],
};

export const NumAffectedColumnSettings = {
  columns: NumAffectedColumns,
  columnGroup: NumAffectedColumnGroup,
  groupParams,
};
