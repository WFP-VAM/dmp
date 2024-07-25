import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const width = 200;

const WaterNeedsColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NumFamNoWa,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoNoWa,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.TimeAceWa,
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.NuFamNoWaEq,
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.NuFamNoLat,
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
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
