/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const SummaryDroughtReportColumns: GridColDef[] = [
  getColumnSetup(
    DroughtSpecific.NumFamAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.NumPeoAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(DroughtSpecific.NumFe, DROUGHT, 40, { type: 'number' }, true),
  getColumnSetup(
    DroughtSpecific.TNumDeath,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FamAgriAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmDam,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.SamNabAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.SamNabDam,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.PaddyAff,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.PaddyDam,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.CowDeath,
    DROUGHT,
    40,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.LandSize,
    DROUGHT,
    40,
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
