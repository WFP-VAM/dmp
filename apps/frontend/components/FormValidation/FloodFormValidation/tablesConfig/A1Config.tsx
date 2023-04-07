import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const A1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.TNumDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD),
];

export const A1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('a1', FLOOD),
    children: [
      {
        ...getGroupSetup('g4', FLOOD),
        children: [
          { field: FloodSpecific.TNumDeath },
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
