/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  INCIDENT,
  IncidentSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 12;

const SummaryIncidentReportColumns: GridColDef[] = [
  getColumnSetup(
    IncidentSpecific.NumFamAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumPeoAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumFeAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumDeathTo,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.ToNumMising,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.ToNumInjure,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.SchAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.SchDam,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.HealthAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.HealthDam,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RivBreakLo,
    INCIDENT,
    defaultColumnWidth + 8 * 12,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RivBreakWid,
    INCIDENT,
    defaultColumnWidth + 8 * 12,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NationalRod,
    INCIDENT,
    defaultColumnWidth + 8 * 12,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RuralRoad,
    INCIDENT,
    defaultColumnWidth + 8 * 12,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.Bridge,
    INCIDENT,
    defaultColumnWidth + 8 * 12,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.PagoAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.PagoDam,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.BuildingAff,
    INCIDENT,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.BuildingDam,
    INCIDENT,
    defaultColumnWidth + 8 * 6,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.MarketAff,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.MarketDam,
    INCIDENT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
];

const SummaryIncidentReportColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('EMPTY', INCIDENT, true),
    children: [{ field: KoboCommonKeys.province }],
  },
];

export const SummaryIncidentReportColumnSettings = {
  columns: SummaryIncidentReportColumns,
  columnGroup: SummaryIncidentReportColumnGroup,
};
