import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const HealthNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NonActingH, FLOOD, 200),
  getColumnSetup(FloodSpecific.PeoCanAceH, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumDoctor, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumNurse, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumStaff, FLOOD, 200),
];

export const HealthNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('healthNeeds', FLOOD),
    children: [
      { field: FloodSpecific.NonActingH },
      { field: FloodSpecific.PeoCanAceH },
      { field: FloodSpecific.NumDoctor },
      { field: FloodSpecific.NumNurse },
      { field: FloodSpecific.NumStaff },
    ],
  },
];
