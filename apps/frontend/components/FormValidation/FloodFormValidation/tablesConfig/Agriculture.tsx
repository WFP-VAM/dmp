import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const AgricultureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.FarmAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.FarmDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.SamNabAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.SamNabDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.PaddyAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.PaddyDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.CowEva, FLOOD, 80),
  getColumnSetup(FloodSpecific.CowDeath, FLOOD, 75),
  getColumnSetup(FloodSpecific.CowMissing, FLOOD, 75),
  getColumnSetup(FloodSpecific.PigEva, FLOOD, 80),
  getColumnSetup(FloodSpecific.PigDeath, FLOOD, 75),
  getColumnSetup(FloodSpecific.PigMissing, FLOOD, 75),
  getColumnSetup(FloodSpecific.BirdEva, FLOOD, 80),
  getColumnSetup(FloodSpecific.BirdDeath, FLOOD, 75),
  getColumnSetup(FloodSpecific.BirdMissing, FLOOD, 75),
];

const AgricultureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('agriculture', FLOOD, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
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

export const AgricultureColumnSettings = {
  columns: AgricultureColumns,
  columnGroup: AgricultureColumnGroup,
};
