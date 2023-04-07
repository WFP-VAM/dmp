import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffected2Columns: GridColDef[] = [
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

export const NumAffected2ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD),
    children: [
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
