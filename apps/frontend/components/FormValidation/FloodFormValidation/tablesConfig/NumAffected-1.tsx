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
  getColumnSetup(FloodSpecific.NumTMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumMeMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumFeMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumKidMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumOldMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumDisMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumTInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumMeInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumFeInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumKidInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumOldInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumDisInjure, FLOOD),
];

export const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD),
    children: [
      { field: FloodSpecific.NumVillAff },
      {
        ...getGroupSetup('totalAffected', FLOOD),
        children: [
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
      {
        ...getGroupSetup('missing', FLOOD),
        children: [
          { field: FloodSpecific.NumTMissing },
          { field: FloodSpecific.NumMeMissing },
          { field: FloodSpecific.NumFeMissing },
          { field: FloodSpecific.NumKidMissing },
          { field: FloodSpecific.NumOldMissing },
          { field: FloodSpecific.NumDisMissing },
        ],
      },
      {
        ...getGroupSetup('injured', FLOOD),
        children: [
          { field: FloodSpecific.NumTInjure },
          { field: FloodSpecific.NumMeInjure },
          { field: FloodSpecific.NumFeInjure },
          { field: FloodSpecific.NumKidInjure },
          { field: FloodSpecific.NumOldInjure },
          { field: FloodSpecific.NumDisInjure },
        ],
      },
    ],
  },
];
