import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const WaterAgricultureColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.LandSize,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PumMachine,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumGasoline,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFam,
    disaster: DROUGHT,
    width: 100,
  }),
];

const WaterAgricultureColumnGroup: GridColumnGroupingModel = [];

const groupParams: ColumnSetupParams = {
  groupId: 'waterAgriculture',
  disaster: DROUGHT,
  additionalChildren: [
    { field: DroughtSpecific.LandSize },
    { field: DroughtSpecific.PumMachine },
    { field: DroughtSpecific.NumGasoline },
    { field: DroughtSpecific.NumFam },
  ],
};

export const WaterAgricultureColumnSettings = {
  columns: WaterAgricultureColumns,
  columnGroup: WaterAgricultureColumnGroup,
  groupParams,
};
