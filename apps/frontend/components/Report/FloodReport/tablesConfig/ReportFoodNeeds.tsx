import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportFoodNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamNoFod, FLOOD, 140),
  getColumnSetup(FloodSpecific.NumPeoNoFod, FLOOD, 140),
  getColumnSetup(FloodSpecific.FamNoFod7d, FLOOD, 220),
  getColumnSetup(FloodSpecific.NumActShop, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumNoActShop, FLOOD, 150),
  // This field is categorical, the number 1 and 2 are the possible values in Kobo. They are counted separately in the report
  getColumnSetup(FloodSpecific.RicePrice + '_1', FLOOD, 150),
  getColumnSetup(FloodSpecific.RicePrice + '_2', FLOOD, 150),
];

const ReportFoodNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('foodNeeds', FLOOD, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
    ],
  },
  {
    ...getGroupSetup('foodPeople', FLOOD),
    children: [
      { field: FloodSpecific.NumFamNoFod },
      { field: FloodSpecific.NumPeoNoFod },
    ],
  },
  {
    ...getGroupSetup('foodMarket', FLOOD),
    headerClassName: 'header-top-cell left-border',
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
];

export const ReportFoodNeedsColumnSettings = {
  columns: ReportFoodNeedsColumns,
  columnGroup: ReportFoodNeedsColumnGroup,
};
