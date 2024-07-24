import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const width = 200;

const WaterNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamNoWa, FLOOD, width),
  getColumnSetup(FloodSpecific.NumPeoNoWa, FLOOD, width),
  getColumnSetup(FloodSpecific.TimeAceWa, FLOOD, width + 8 * 2),
  getColumnSetup(FloodSpecific.NuFamNoWaEq, FLOOD, width + 8 * 2),
  getColumnSetup(FloodSpecific.NuFamNoLat, FLOOD, width + 8 * 2),
];

const WaterNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('noWater', FLOOD),
    children: [
      { field: FloodSpecific.NumFamNoWa },
      { field: FloodSpecific.NumPeoNoWa },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'waterNeeds',
  disaster: FLOOD,
  additionalChildren: [],
};

export const WaterNeedsColumnSettings = {
  columns: WaterNeedsColumns,
  columnGroup: WaterNeedsColumnGroup,
  groupParams,
};
