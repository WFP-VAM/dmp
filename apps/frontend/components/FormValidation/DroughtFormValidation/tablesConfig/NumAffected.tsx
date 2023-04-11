import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffected1Columns: GridColDef[] = [
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

export const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', DROUGHT),
    children: [
      {
        ...getGroupSetup('lackingWater', DROUGHT),
        children: [
          { field: DroughtSpecific.NumVillAff },
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
