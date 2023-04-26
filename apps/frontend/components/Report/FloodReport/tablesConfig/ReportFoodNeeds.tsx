import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const ReportFoodNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamNoFod, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoNoFod, FLOOD, 200),
  getColumnSetup(FloodSpecific.FamNoFod7d, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumActShop, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumNoActShop, FLOOD, 200),
  getColumnSetup(FloodSpecific.RicePrice + '_1', FLOOD, 200),
  getColumnSetup(FloodSpecific.RicePrice + '_2', FLOOD, 200),
];

export const ReportFoodNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('foodNeeds', FLOOD),
    children: [
      {
        ...getGroupSetup('foodPeople', FLOOD),
        children: [
          { field: FloodSpecific.NumFamNoFod },
          { field: FloodSpecific.NumPeoNoFod },
        ],
      },
      { field: FloodSpecific.FamNoFod7d },
      {
        ...getGroupSetup('foodMarket', FLOOD),
        children: [
          { field: FloodSpecific.NumActShop },
          { field: FloodSpecific.NumNoActShop },
        ],
      },
      {
        ...getGroupSetup('reportRicePrice', FLOOD),
        children: [
          { field: FloodSpecific.RicePrice + '_1' },
          { field: FloodSpecific.RicePrice + '_2' },
        ],
      },
    ],
  },
];
