/* eslint-disable max-lines */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup } from 'utils/tableFormatting';

const defaultColumnWidth = 8 * 14;

const SummaryDroughtReportColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.NumVillAff,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFamAff,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumPeoAff,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFe,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.TNumDeath,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.FamAgriAff,
    disaster: DROUGHT,
    width: defaultColumnWidth + 8 * 6,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.FarmAff,
    disaster: DROUGHT,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.FarmDam,
    disaster: DROUGHT,
    width: defaultColumnWidth + 8 * 5,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.SamNabAff,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.SamNabDam,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.PaddyAff,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.PaddyDam,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.CowDeath,
    disaster: DROUGHT,
    width: defaultColumnWidth,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.LandSize,
    disaster: DROUGHT,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFam,
    disaster: DROUGHT,
    width: defaultColumnWidth + 8 * 4,
    opts: { type: 'number' },
    isSummary: true,
  }),
];

const SummaryDroughtReportColumnGroup: GridColumnGroupingModel = [];

export const SummaryDroughtReportColumnSettings = {
  columns: SummaryDroughtReportColumns,
  columnGroup: SummaryDroughtReportColumnGroup,
};
