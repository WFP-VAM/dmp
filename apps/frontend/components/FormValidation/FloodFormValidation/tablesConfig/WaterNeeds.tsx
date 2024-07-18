import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

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
    ...getGroupSetup('waterNeeds', FLOOD, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
    ],
  },
  {
    ...getGroupSetup('noWater', FLOOD),
    children: [
      { field: FloodSpecific.NumFamNoWa },
      { field: FloodSpecific.NumPeoNoWa },
    ],
  },
];

export const WaterNeedsColumnSettings = {
  columns: WaterNeedsColumns,
  columnGroup: WaterNeedsColumnGroup,
};
