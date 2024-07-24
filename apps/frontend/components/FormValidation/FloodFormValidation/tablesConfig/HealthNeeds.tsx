import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const width = 200;

const HealthNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NonActingH, FLOOD, width),
  getColumnSetup(FloodSpecific.PeoCanAceH, FLOOD, width),
  getColumnSetup(FloodSpecific.NumDoctor, FLOOD, width),
  getColumnSetup(FloodSpecific.NumNurse, FLOOD, width),
  getColumnSetup(FloodSpecific.NumStaff, FLOOD, width),
];

const HealthNeedsColumnGroup: GridColumnGroupingModel = [];

const groupParams: ColumnSetupParams = {
  groupId: 'healthNeeds',
  disaster: FLOOD,
  additionalChildren: [
    { field: FloodSpecific.NonActingH },
    { field: FloodSpecific.PeoCanAceH },
    { field: FloodSpecific.NumDoctor },
    { field: FloodSpecific.NumNurse },
    { field: FloodSpecific.NumStaff },
  ],
};

export const HealthNeedsColumnSettings = {
  columns: HealthNeedsColumns,
  columnGroup: HealthNeedsColumnGroup,
  groupParams,
};
