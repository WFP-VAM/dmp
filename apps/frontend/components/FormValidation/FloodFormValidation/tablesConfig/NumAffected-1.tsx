import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumVillAff, FLOOD),
  getColumnSetup(FloodSpecific.NumPeoAff, FLOOD),
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD),
  getColumnSetup(FloodSpecific.NumTDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD),
];

export const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD),
    children: [
      {
        ...getGroupSetup('totalAffected', FLOOD),
        children: [
          { field: FloodSpecific.NumVillAff },
          { field: FloodSpecific.NumPeoAff },
          { field: FloodSpecific.NumFamAff },
          { field: FloodSpecific.NumFeAff },
        ],
      },
      {
        ...getGroupSetup('deathToll', FLOOD),
        children: [
          { field: FloodSpecific.NumTDeath },
          { field: FloodSpecific.NumMeDeath },
          { field: FloodSpecific.NumFeDeath },
          { field: FloodSpecific.NumKidDeath },
          { field: FloodSpecific.NumOldDeath },
          { field: FloodSpecific.NumDisDeath },
        ],
      },
    ],
  },
];
