/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 100;

const SummaryDroughtReportColumns: GridColDef[] = [
  getColumnSetup(
    DroughtSpecific.NumFamAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.NumPeoAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.NumFe,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.TNumDeath,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FamAgriAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmDam,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.SamNabAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.SamNabDam,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.PaddyAff,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.PaddyDam,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.CowDeath,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.LandSize,
    DROUGHT,
    defaultColumnWidth,
    { type: 'number' },
    true,
  ),
  getColumnSetup(DroughtSpecific.NumFam, DROUGHT, 40, { type: 'number' }, true),
];

const SummaryDroughtReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryDroughtReportColumnSettings = {
  columns: SummaryDroughtReportColumns,
  columnGroup: SummaryDroughtReportColumnGroup,
};
