import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const EducationNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumTemSch, FLOOD, 150),
  getColumnSetup(FloodSpecific.StuAcTemSch, FLOOD, 150),
  getColumnSetup(FloodSpecific.SchUseSafe, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumStu, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumSchStop, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumStuNoCla, FLOOD, 150),
];

const EducationNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('educationNeeds', FLOOD, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
    ],
  },
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

export const EducationNeedsSettings = {
  columns: EducationNeedsColumns,
  columnGroup: EducationNeedsColumnGroup,
};
