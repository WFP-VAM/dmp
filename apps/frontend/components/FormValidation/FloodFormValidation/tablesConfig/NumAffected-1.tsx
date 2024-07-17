import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const colWidth = 56;

const NumAffected1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumVillAff, FLOOD, colWidth),
  getColumnSetup(
    FloodSpecific.NumPeoAff,
    FLOOD,
    colWidth,
    undefined,
    undefined,
    'bold',
    true,
  ),
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD, colWidth),
  getColumnSetup(
    FloodSpecific.NumTDeath,
    FLOOD,
    colWidth,
    undefined,
    undefined,
    'bold',
    true,
  ),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD, colWidth),
  getColumnSetup(
    FloodSpecific.NumTMissing,
    FLOOD,
    colWidth,
    undefined,
    undefined,
    'bold',
    true,
  ),
  getColumnSetup(FloodSpecific.NumMeMissing, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumFeMissing, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumKidMissing, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumOldMissing, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumDisMissing, FLOOD, colWidth),
  getColumnSetup(
    FloodSpecific.NumTInjure,
    FLOOD,
    colWidth,
    undefined,
    undefined,
    'bold',
    true,
  ),
  getColumnSetup(FloodSpecific.NumMeInjure, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumFeInjure, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumKidInjure, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumOldInjure, FLOOD, colWidth),
  getColumnSetup(FloodSpecific.NumDisInjure, FLOOD, colWidth),
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
