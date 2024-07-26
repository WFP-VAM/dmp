import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const width = 200;

const HealthNeedsColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NonActingH,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.PeoCanAceH,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumDoctor,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumNurse,
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.NumStaff,
    disaster: FLOOD,
    width: width,
  }),
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
