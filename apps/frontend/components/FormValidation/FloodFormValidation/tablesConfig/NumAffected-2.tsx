import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffected2Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamEva, FLOOD),
  getColumnSetup(FloodSpecific.NumPeoEva, FLOOD),
  getColumnSetup(FloodSpecific.NumMeEva, FLOOD),
  getColumnSetup(FloodSpecific.NumFeEva, FLOOD),
  getColumnSetup(FloodSpecific.NumKidEva, FLOOD),
  getColumnSetup(FloodSpecific.NumOldEva, FLOOD),
  getColumnSetup(FloodSpecific.NumDisEva, FLOOD),
  getColumnSetup(FloodSpecific.NumFamRe, FLOOD),
  getColumnSetup(FloodSpecific.NumPeoRe, FLOOD),
  getColumnSetup(FloodSpecific.NumMeRe, FLOOD),
  getColumnSetup(FloodSpecific.NumFeRe, FLOOD),
  getColumnSetup(FloodSpecific.NumKidRe, FLOOD),
  getColumnSetup(FloodSpecific.NumOldRe, FLOOD),
  getColumnSetup(FloodSpecific.NumDisRe, FLOOD),
  getColumnSetup(FloodSpecific.NumSafePla, FLOOD, 100),
  getColumnSetup(FloodSpecific.NumPeoSEC, FLOOD, 100),
];

export const NumAffected2ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD),
    children: [
      {
        ...getGroupSetup('evacuated', FLOOD),
        children: [
          { field: FloodSpecific.NumFamEva },
          { field: FloodSpecific.NumPeoEva },
          { field: FloodSpecific.NumMeEva },
          { field: FloodSpecific.NumFeEva },
          { field: FloodSpecific.NumKidEva },
          { field: FloodSpecific.NumOldEva },
          { field: FloodSpecific.NumDisEva },
        ],
      },
      {
        ...getGroupSetup('relocated', FLOOD),
        children: [
          { field: FloodSpecific.NumFamRe },
          { field: FloodSpecific.NumPeoRe },
          { field: FloodSpecific.NumMeRe },
          { field: FloodSpecific.NumFeRe },
          { field: FloodSpecific.NumKidRe },
          { field: FloodSpecific.NumOldRe },
          { field: FloodSpecific.NumDisRe },
        ],
      },
      {
        ...getGroupSetup('safeLocation', FLOOD),
        children: [
          { field: FloodSpecific.NumSafePla },
          { field: FloodSpecific.NumPeoSEC },
        ],
      },
    ],
  },
];
