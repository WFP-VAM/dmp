import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffected1Columns = (detailed: boolean): GridColDef[] => [
  getColumnSetup(FloodSpecific.NumVillAff, FLOOD),
  getColumnSetup(
    FloodSpecific.NumPeoAff,
    FLOOD,
    undefined,
    undefined,
    undefined,
    'bold',
    !detailed,
  ),
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD),
  getColumnSetup(
    FloodSpecific.NumTDeath,
    FLOOD,
    undefined,
    undefined,
    undefined,
    'bold',
    !detailed,
  ),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD),
  getColumnSetup(
    FloodSpecific.NumTMissing,
    FLOOD,
    undefined,
    undefined,
    undefined,
    'bold',
    !detailed,
  ),
  getColumnSetup(FloodSpecific.NumMeMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumFeMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumKidMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumOldMissing, FLOOD),
  getColumnSetup(FloodSpecific.NumDisMissing, FLOOD),
  getColumnSetup(
    FloodSpecific.NumTInjure,
    FLOOD,
    undefined,
    undefined,
    undefined,
    'bold',
    !detailed,
  ),
  getColumnSetup(FloodSpecific.NumMeInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumFeInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumKidInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumOldInjure, FLOOD),
  getColumnSetup(FloodSpecific.NumDisInjure, FLOOD),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('totalAffected', FLOOD),
    children: [
      { field: FloodSpecific.NumPeoAff },
      { field: FloodSpecific.NumFamAff },
      { field: FloodSpecific.NumFeAff },
    ],
  },
  {
    ...getGroupSetup('deathToll', FLOOD),
    children: [
      { field: FloodSpecific.NumTDeath },
      { field: FloodSpecific.NumMeDeath },
      { field: FloodSpecific.NumFeDeath },
      { field: FloodSpecific.NumKidDeath },
      { field: FloodSpecific.NumOldDeath },
      { field: FloodSpecific.NumDisDeath },
    ],
  },
  {
    ...getGroupSetup('missing', FLOOD),
    children: [
      { field: FloodSpecific.NumTMissing },
      { field: FloodSpecific.NumMeMissing },
      { field: FloodSpecific.NumFeMissing },
      { field: FloodSpecific.NumKidMissing },
      { field: FloodSpecific.NumOldMissing },
      { field: FloodSpecific.NumDisMissing },
    ],
  },
  {
    ...getGroupSetup('injured', FLOOD),
    children: [
      { field: FloodSpecific.NumTInjure },
      { field: FloodSpecific.NumMeInjure },
      { field: FloodSpecific.NumFeInjure },
      { field: FloodSpecific.NumKidInjure },
      { field: FloodSpecific.NumOldInjure },
      { field: FloodSpecific.NumDisInjure },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: FLOOD,
  additionalChildren: [{ field: FloodSpecific.NumVillAff }],
};

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
  groupParams,
};
