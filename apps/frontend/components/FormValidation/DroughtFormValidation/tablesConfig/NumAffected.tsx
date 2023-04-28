import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffectedColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NumVillAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumFamAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumPeoAff, DROUGHT),
  getColumnSetup(DroughtSpecific.NumMe, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumFe, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumKid, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumOld, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumDisMising, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.TNumDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.NumMeDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumFeDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumKidDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumOldDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumDisDeath, DROUGHT, 70),
];

const NumAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', DROUGHT),
    children: [
      { field: DroughtSpecific.NumVillAff },
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
    ],
  },
];

export const NumAffectedColumnSettings = {
  columns: NumAffectedColumns,
  columnGroup: NumAffectedColumnGroup,
};
