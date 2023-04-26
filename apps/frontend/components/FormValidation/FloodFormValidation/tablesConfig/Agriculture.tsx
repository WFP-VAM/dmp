import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const AgricultureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.FarmAff, FLOOD),
  getColumnSetup(FloodSpecific.FarmDam, FLOOD),
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

export const AgricultureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('agriculture', FLOOD),
    children: [
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
    ],
  },
];
