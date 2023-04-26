import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const EducationNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumTemSch, FLOOD, 200),
  getColumnSetup(FloodSpecific.StuAcTemSch, FLOOD, 200),
  getColumnSetup(FloodSpecific.SchUseSafe, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumStu, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumSchStop, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumStuNoCla, FLOOD, 200),
];

export const EducationNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('educationNeeds', FLOOD),
    children: [
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
    ],
  },
];
