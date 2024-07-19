import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

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
