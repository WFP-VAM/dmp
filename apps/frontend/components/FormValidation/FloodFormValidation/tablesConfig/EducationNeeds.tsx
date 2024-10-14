import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const width = 150;

const EducationNeedsColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NumTemSch,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.StuAcTemSch,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.SchUseSafe,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumStu,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumSchStop,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumStuNoCla,
    disaster: FLOOD,
    width: width,
  }),
];

const EducationNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('schoolStop', FLOOD),
    children: [
      { field: FloodSpecific.NumTemSch },
      { field: FloodSpecific.StuAcTemSch },
    ],
  },
  {
    ...getGroupSetup('schoolNeeded', FLOOD),
    children: [
      { field: FloodSpecific.SchUseSafe },
      { field: FloodSpecific.NumStu },
    ],
  },
  {
    ...getGroupSetup('schoolShelter', FLOOD),
    children: [
      { field: FloodSpecific.NumSchStop },
      { field: FloodSpecific.NumStuNoCla },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'educationNeeds',
  disaster: FLOOD,
  additionalChildren: [],
};

export const EducationNeedsSettings = {
  columns: EducationNeedsColumns,
  columnGroup: EducationNeedsColumnGroup,
  groupParams,
};
