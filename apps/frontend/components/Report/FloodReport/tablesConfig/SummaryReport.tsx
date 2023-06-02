import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const SummaryFloodReportColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumPeoAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumFeAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumTDeath, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumFamEva, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumPeoEva, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumFeEva, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumHouAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.NumSchoAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.SamNabAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.SamNabDam, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.PaddyAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.PaddyDam, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(
    FloodSpecific.RubberRoAff,
    FLOOD,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(FloodSpecific.ConcretAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.RuralRoAff, FLOOD, 40, { type: 'number' }, true),
  getColumnSetup(FloodSpecific.BridgeAff, FLOOD, 40, { type: 'number' }, true),
];

const SummaryFloodReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryFloodReportColumnSettings = {
  columns: SummaryFloodReportColumns,
  columnGroup: SummaryFloodReportColumnGroup,
};
