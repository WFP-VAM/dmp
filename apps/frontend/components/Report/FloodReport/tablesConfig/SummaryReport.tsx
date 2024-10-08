import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 12;
const SummaryFloodReportColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NumVillAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFamAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFeAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumTDeath,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFamEva,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoEva,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFeEva,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumHouAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.NumSchoAff,
    disaster: FLOOD,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.SamNabAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.SamNabDam,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.PaddyAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.PaddyDam,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.RubberRoAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.ConcretAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.RuralRoAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: FloodSpecific.BridgeAff,
    disaster: FLOOD,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
];

const SummaryFloodReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryFloodReportColumnSettings = {
  columns: SummaryFloodReportColumns,
  columnGroup: SummaryFloodReportColumnGroup,
};
