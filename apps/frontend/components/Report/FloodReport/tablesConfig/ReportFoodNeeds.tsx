import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportFoodNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamNoFod, FLOOD, 140),
  getColumnSetup(FloodSpecific.NumPeoNoFod, FLOOD, 140),
  getColumnSetup(FloodSpecific.FamNoFod7d, FLOOD, 220),
  getColumnSetup(FloodSpecific.NumActShop, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumNoActShop, FLOOD, 150),
  getColumnSetup(FloodSpecific.RicePrice + '_1', FLOOD, 150),
  getColumnSetup(FloodSpecific.RicePrice + '_2', FLOOD, 150),
];

const ReportFoodNeedsColumnGroup: GridColumnGroupingModel = [
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

export const ReportFoodNeedsColumnSettings = {
  columns: ReportFoodNeedsColumns,
  columnGroup: ReportFoodNeedsColumnGroup,
};
