import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumVillAff, FLOOD, 70),
  getColumnSetup(
    FloodSpecific.NumPeoAff,
    FLOOD,
    70,
    undefined,
    undefined,
    'bold',
  ),
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD, 65),
  getColumnSetup(
    FloodSpecific.NumTDeath,
    FLOOD,
    70,
    undefined,
    undefined,
    'bold',
  ),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD, 45),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD, 75),
  getColumnSetup(
    FloodSpecific.NumTMissing,
    FLOOD,
    85,
    undefined,
    undefined,
    'bold',
  ),
  getColumnSetup(FloodSpecific.NumMeMissing, FLOOD, 45),
  getColumnSetup(FloodSpecific.NumFeMissing, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumKidMissing, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldMissing, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumDisMissing, FLOOD, 75),
  getColumnSetup(
    FloodSpecific.NumTInjure,
    FLOOD,
    85,
    undefined,
    undefined,
    'bold',
  ),
  getColumnSetup(FloodSpecific.NumMeInjure, FLOOD, 45),
  getColumnSetup(FloodSpecific.NumFeInjure, FLOOD, 66),
  getColumnSetup(FloodSpecific.NumKidInjure, FLOOD, 70),
  getColumnSetup(FloodSpecific.NumOldInjure, FLOOD, 60),
  getColumnSetup(FloodSpecific.NumDisInjure, FLOOD, 75),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD, true),
    headerName: 'some-name',
    headerClassName: 'header-setting-cell',
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
      { field: FloodSpecific.NumVillAff },
    ],
  },
  {
    ...getGroupSetup('totalAffected', FLOOD),
    headerClassName: 'header-top-cell',
    children: [
      { field: FloodSpecific.NumPeoAff },
      { field: FloodSpecific.NumFamAff },
      { field: FloodSpecific.NumFeAff },
    ],
  },
  {
    ...getGroupSetup('deathToll', FLOOD),
    headerClassName: 'header-top-cell',
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
    headerClassName: 'header-top-cell',
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
    headerClassName: 'header-top-cell',
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

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
};
