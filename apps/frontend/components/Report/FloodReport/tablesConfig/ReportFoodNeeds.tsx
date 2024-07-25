import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const ReportFoodNeedsColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NumFamNoFod,
    disaster: FLOOD,
    width: 140,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoNoFod,
    disaster: FLOOD,
    width: 140,
  }),
  getColumnSetup({
    field: FloodSpecific.FamNoFod7d,
    disaster: FLOOD,
    width: 220,
  }),
  getColumnSetup({
    field: FloodSpecific.NumActShop,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumNoActShop,
    disaster: FLOOD,
    width: 150,
  }),
  // This field is categorical, the number 1 and 2 are the possible values in Kobo. They are counted separately in the report
  getColumnSetup({
    field: FloodSpecific.RicePrice + '_1',
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.RicePrice + '_2',
    disaster: FLOOD,
    width: 150,
  }),
];

const ReportFoodNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('foodPeople', FLOOD),
    children: [
      { field: FloodSpecific.NumFamNoFod },
      { field: FloodSpecific.NumPeoNoFod },
    ],
  },
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
];

const groupParams: ColumnSetupParams = {
  groupId: 'foodNeeds',
  disaster: FLOOD,
  additionalChildren: [],
};

export const ReportFoodNeedsColumnSettings = {
  columns: ReportFoodNeedsColumns,
  columnGroup: ReportFoodNeedsColumnGroup,
  groupParams,
};
