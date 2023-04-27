import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamNoWa, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoNoWa, FLOOD, 200),
  getColumnSetup(FloodSpecific.TimeAceWa, FLOOD, 200),
  getColumnSetup(FloodSpecific.NuFamNoWaEq, FLOOD, 200),
  getColumnSetup(FloodSpecific.NuFamNoLat, FLOOD, 200),
];

const WaterNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('waterNeeds', FLOOD),
    children: [
      {
        ...getGroupSetup('noWater', FLOOD),
        children: [
          { field: FloodSpecific.NumFamNoWa },
          { field: FloodSpecific.NumPeoNoWa },
        ],
      },
      { field: FloodSpecific.TimeAceWa },
      { field: FloodSpecific.NuFamNoWaEq },
      { field: FloodSpecific.NuFamNoLat },
    ],
  },
];

export const WaterNeedsColumnSettings = {
  columns: WaterNeedsColumns,
  columnGroup: WaterNeedsColumnGroup,
};
