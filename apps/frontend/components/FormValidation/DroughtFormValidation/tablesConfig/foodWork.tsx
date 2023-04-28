import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const FoodWorkColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.FamNoIncom, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PeoNoIncom, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.FamNoFod, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PeoNoFod, DROUGHT, 100),
];

const FoodWorkColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('foodWork', DROUGHT),
    children: [
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
    ],
  },
];

export const FoodWorkColumnSettings = {
  columns: FoodWorkColumns,
  columnGroup: FoodWorkColumnGroup,
};
