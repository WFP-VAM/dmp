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
  getColumnSetup({
    field: FloodSpecific.ToNamAgriAff,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFarmCroAff,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.FarmAff,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.FarmDam,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({ field: FloodSpecific.SamNabAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.SamNabDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFarmPaddyAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PaddyAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PaddyDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.CowEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.CowDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.CowMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PigEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PigDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PigMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BirdEva, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BirdDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BirdMissing, disaster: FLOOD }),
];

const AgricultureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('families', FLOOD),
    children: [
      { field: FloodSpecific.ToNamAgriAff },
      { field: FloodSpecific.NumFarmCroAff },
    ],
  },
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
      { field: FloodSpecific.NumFarmPaddyAff },
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
