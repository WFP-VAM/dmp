import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffected2Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamEva, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumPeoEva, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumMeEva, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumFeEva, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumKidEva, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldEva, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumDisEva, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumFamRe, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumPeoRe, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumMeRe, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumFeRe, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumKidRe, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldRe, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumDisRe, FLOOD, 70),
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
