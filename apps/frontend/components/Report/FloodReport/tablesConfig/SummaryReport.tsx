import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 12;
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
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.SamNabDam,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.PaddyAff,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.PaddyDam,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.RubberRoAff,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.ConcretAff,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.RuralRoAff,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    FloodSpecific.BridgeAff,
    FLOOD,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
];

const SummaryFloodReportColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('EMPTY', FLOOD, true),
    children: [{ field: KoboCommonKeys.province }],
  },
];

export const SummaryFloodReportColumnSettings = {
  columns: SummaryFloodReportColumns,
  columnGroup: SummaryFloodReportColumnGroup,
};
