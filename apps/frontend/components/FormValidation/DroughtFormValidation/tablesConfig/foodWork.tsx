import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const FoodWorkColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.FamNoIncom,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PeoNoIncom,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.FamNoFod,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PeoNoFod,
    disaster: DROUGHT,
    width: 100,
  }),
];

const FoodWorkColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('workLoss', DROUGHT),
    children: [
      { field: DroughtSpecific.FamNoIncom },
      { field: DroughtSpecific.PeoNoIncom },
    ],
  },
  {
    ...getGroupSetup('foodNeed', DROUGHT),
    children: [
      { field: DroughtSpecific.FamNoFod },
      { field: DroughtSpecific.PeoNoFod },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'foodWork',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const FoodWorkColumnSettings = {
  columns: FoodWorkColumns,
  columnGroup: FoodWorkColumnGroup,
  groupParams,
};
