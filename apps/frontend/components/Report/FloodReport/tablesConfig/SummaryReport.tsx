import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 90;
const SummaryFloodReportColumns: GridColDef[] = [
  getColumnSetup(
    FloodSpecific.NumFamAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumPeoAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumFeAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumTDeath,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumFamEva,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumPeoEva,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumFeEva,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumHouAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.NumSchoAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.SamNabAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.SamNabDam,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.PaddyAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.PaddyDam,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.RubberRoAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.ConcretAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.RuralRoAff,
    FLOOD,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.BridgeAff,
    FLOOD,
    defaultColumnWidth + 10,
    { type: 'number' },
    true,
  ),
];

const SummaryFloodReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryFloodReportColumnSettings = {
  columns: SummaryFloodReportColumns,
  columnGroup: SummaryFloodReportColumnGroup,
};
