import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const IrrigationColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.DamHavWater,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.DamNoWater,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PondHavWat,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PondNoWate,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PlumWelHaWat,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.PluWelNoWat,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.DigWelHaWat,
    disaster: DROUGHT,
    width: 120,
  }),
  getColumnSetup({
    field: DroughtSpecific.DigWelNoWat,
    disaster: DROUGHT,
    width: 120,
  }),
];

const IrrigationColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('dam', DROUGHT),
    children: [
      { field: DroughtSpecific.DamHavWater },
      { field: DroughtSpecific.DamNoWater },
    ],
  },
  {
    ...getGroupSetup('pond', DROUGHT),
    children: [
      { field: DroughtSpecific.PondHavWat },
      { field: DroughtSpecific.PondNoWate },
    ],
  },
  {
    ...getGroupSetup('pumpWell', DROUGHT),
    children: [
      { field: DroughtSpecific.PlumWelHaWat },
      { field: DroughtSpecific.PluWelNoWat },
    ],
  },
  {
    ...getGroupSetup('digWell', DROUGHT),
    children: [
      { field: DroughtSpecific.DigWelHaWat },
      { field: DroughtSpecific.DigWelNoWat },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'irrigation',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const IrrigationColumnSettings = {
  columns: IrrigationColumns,
  columnGroup: IrrigationColumnGroup,
  groupParams,
};
