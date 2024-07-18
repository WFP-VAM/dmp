import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const HealthNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NonActingH, FLOOD, 200),
  getColumnSetup(FloodSpecific.PeoCanAceH, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumDoctor, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumNurse, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumStaff, FLOOD, 200),
];

const HealthNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('healthNeeds', FLOOD, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
      { field: FloodSpecific.NonActingH },
      { field: FloodSpecific.PeoCanAceH },
      { field: FloodSpecific.NumDoctor },
      { field: FloodSpecific.NumNurse },
      { field: FloodSpecific.NumStaff },
    ],
  },
];

export const HealthNeedsColumnSettings = {
  columns: HealthNeedsColumns,
  columnGroup: HealthNeedsColumnGroup,
};
