import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const IrrigationColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.DamHavWater, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.DamNoWater, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PondHavWat, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PondNoWate, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PlumWelHaWat, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PluWelNoWat, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.DigWelHaWat, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.DigWelNoWat, DROUGHT, 120),
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
