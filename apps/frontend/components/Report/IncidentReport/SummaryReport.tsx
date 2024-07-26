/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 12;

const SummaryIncidentReportColumns: GridColDef[] = [
  getColumnSetup({
    field: IncidentSpecific.NumFamAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.NumPeoAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.NumFeAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.NumDeathTo,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.ToNumMising,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.ToNumInjure,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.SchAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.SchDam,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.HealthAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.HealthDam,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.RivBreakLo,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 12,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.RivBreakWid,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 12,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.NationalRod,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 12,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.RuralRoad,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 12,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.Bridge,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 12,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.PagoAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.PagoDam,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.BuildingAff,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.BuildingDam,
    disaster: INCIDENT,
    width: defaultColumnWidth + 8 * 6,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.MarketAff,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: IncidentSpecific.MarketDam,
    disaster: INCIDENT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
];

const SummaryIncidentReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryIncidentReportColumnSettings = {
  columns: SummaryIncidentReportColumns,
  columnGroup: SummaryIncidentReportColumnGroup,
};
