import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

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
