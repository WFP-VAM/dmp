import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const colWidth = 8 * 9;

const NumAffected2Columns: GridColDef[] = [
  getColumnSetup({ field: FloodSpecific.NumFamEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumPeoEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumMeEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumKidEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumOldEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDisEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFamRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumPeoRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumMeRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumKidRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumOldRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDisRe, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumSafePla, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumPeoSEC,
    disaster: FLOOD,
    width: colWidth + 8 * 6,
  }),
];

const NumAffected2ColumnGroup: GridColumnGroupingModel = [
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
];

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: FLOOD,
  additionalChildren: [],
};

export const NumAffected2ColumnSettings = {
  columns: NumAffected2Columns,
  columnGroup: NumAffected2ColumnGroup,
  groupParams,
};
