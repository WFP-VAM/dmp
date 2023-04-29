import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumVillAff, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumPeoAff, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumTDeath, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD, 50),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumTMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumMeMissing, FLOOD, 50),
  getColumnSetup(FloodSpecific.NumFeMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumKidMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumDisMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumTInjure, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumMeInjure, FLOOD, 50),
  getColumnSetup(FloodSpecific.NumFeInjure, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumKidInjure, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldInjure, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumDisInjure, FLOOD, 70),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
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

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
};
