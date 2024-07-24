import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

// TODO: export as const, as this is the default width in getColumnSetup
const colWidth = 8 * 9;

const AgricultureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.FarmAff, FLOOD, colWidth + 8 * 2),
  getColumnSetup(FloodSpecific.FarmDam, FLOOD, colWidth + 8 * 2),
  getColumnSetup(FloodSpecific.SamNabAff, FLOOD),
  getColumnSetup(FloodSpecific.SamNabDam, FLOOD),
  getColumnSetup(FloodSpecific.PaddyAff, FLOOD),
  getColumnSetup(FloodSpecific.PaddyDam, FLOOD),
  getColumnSetup(FloodSpecific.CowEva, FLOOD),
  getColumnSetup(FloodSpecific.CowDeath, FLOOD),
  getColumnSetup(FloodSpecific.CowMissing, FLOOD),
  getColumnSetup(FloodSpecific.PigEva, FLOOD),
  getColumnSetup(FloodSpecific.PigDeath, FLOOD),
  getColumnSetup(FloodSpecific.PigMissing, FLOOD),
  getColumnSetup(FloodSpecific.BirdEva, FLOOD),
  getColumnSetup(FloodSpecific.BirdDeath, FLOOD),
  getColumnSetup(FloodSpecific.BirdMissing, FLOOD),
];

const AgricultureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('plantation', FLOOD),
    children: [
      { field: FloodSpecific.FarmAff },
      { field: FloodSpecific.FarmDam },
    ],
  },
  {
    ...getGroupSetup('seedling', FLOOD),
    children: [
      { field: FloodSpecific.SamNabAff },
      { field: FloodSpecific.SamNabDam },
    ],
  },
  {
    ...getGroupSetup('transplanting', FLOOD),
    children: [
      { field: FloodSpecific.PaddyAff },
      { field: FloodSpecific.PaddyDam },
    ],
  },
  {
    ...getGroupSetup('cow', FLOOD),
    children: [
      { field: FloodSpecific.CowEva },
      { field: FloodSpecific.CowDeath },
      { field: FloodSpecific.CowMissing },
    ],
  },
  {
    ...getGroupSetup('pig', FLOOD),
    children: [
      { field: FloodSpecific.PigEva },
      { field: FloodSpecific.PigDeath },
      { field: FloodSpecific.PigMissing },
    ],
  },
  {
    ...getGroupSetup('bird', FLOOD),
    children: [
      { field: FloodSpecific.BirdEva },
      { field: FloodSpecific.BirdDeath },
      { field: FloodSpecific.BirdMissing },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'agriculture',
  disaster: FLOOD,
  additionalChildren: [],
};

export const AgricultureColumnSettings = {
  columns: AgricultureColumns,
  columnGroup: AgricultureColumnGroup,
  groupParams,
};
