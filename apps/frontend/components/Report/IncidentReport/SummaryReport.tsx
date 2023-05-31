/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const SummaryIncidentReportColumns: GridColDef[] = [
  getColumnSetup(
    IncidentSpecific.NumFamAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumPeoAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumFeAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NumDeathTo,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.ToNumMising,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.ToNumInjure,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.SchAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.SchDam,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.HealthAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.HealthDam,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RivBreakLo,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RivBreakWid,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.NationalRod,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.RuralRoad,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.Bridge,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.PagoAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.PagoDam,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.BuildingAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.BuildingDam,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.MarketAff,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    IncidentSpecific.MarketDam,
    INCIDENT,
    35,
    { type: 'number' },
    true,
  ),
];

const SummaryIncidentReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryIncidentReportColumnSettings = {
  columns: SummaryIncidentReportColumns,
  columnGroup: SummaryIncidentReportColumnGroup,
};
