import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const WaterAgricultureColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.LandSize, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PumMachine, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumGasoline, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumFam, DROUGHT, 100),
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
