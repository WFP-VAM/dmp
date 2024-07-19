/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 14;

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
    defaultColumnWidth + 8 * 6,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmAff,
    DROUGHT,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.FarmDam,
    DROUGHT,
    defaultColumnWidth + 8 * 5,
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
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
  getColumnSetup(
    DroughtSpecific.NumFam,
    DROUGHT,
    defaultColumnWidth + 8 * 4,
    { type: 'number' },
    true,
  ),
];

const SummaryDroughtReportColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('EMPTY', DROUGHT, true),
    children: [{ field: KoboCommonKeys.province }],
  },
];

export const SummaryDroughtReportColumnSettings = {
  columns: SummaryDroughtReportColumns,
  columnGroup: SummaryDroughtReportColumnGroup,
};
