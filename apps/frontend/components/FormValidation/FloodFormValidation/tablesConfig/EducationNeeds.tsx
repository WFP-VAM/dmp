import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const width = 150;

const EducationNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumTemSch, FLOOD, width),
  getColumnSetup(FloodSpecific.StuAcTemSch, FLOOD, width),
  getColumnSetup(FloodSpecific.SchUseSafe, FLOOD, width),
  getColumnSetup(FloodSpecific.NumStu, FLOOD, width),
  getColumnSetup(FloodSpecific.NumSchStop, FLOOD, width),
  getColumnSetup(FloodSpecific.NumStuNoCla, FLOOD, width),
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
