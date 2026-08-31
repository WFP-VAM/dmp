import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  isDroughtArray,
  isFloodArray,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import { groupBy, map } from 'lodash';

import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';
import { droughtReportTablesMapping } from 'components/Report/DroughtReport/droughtReportTablesMapping';
import { SummaryDroughtReportColumnSettings } from 'components/Report/DroughtReport/tablesConfig/SummaryReport';
import { floodReportTablesMapping } from 'components/Report/FloodReport/floodReportTablesMapping';
import { SummaryFloodReportColumnSettings } from 'components/Report/FloodReport/tablesConfig/SummaryReport';
import { SummaryIncidentReportColumnSettings } from 'components/Report/IncidentReport/SummaryReport';
import {
  generateDroughtCommuneLevelReport,
  generateDroughtProvinceLevelReport,
} from 'utils/aggregate/generateDroughtReport';
import {
  generateFloodCommuneLevelReport,
  generateFloodProvinceLevelReport,
} from 'utils/aggregate/generateFloodReport';
import {
  generateIncidentCommuneLevelReport,
  generateIncidentProvinceLevelReport,
} from 'utils/aggregate/generateIncidentReport';
import {
  filterFloodReports,
  formatDroughtFields,
  formatFloodFields,
  formatIncidentFields,
} from 'utils/formatRawToForm';
import { estimatePrintPageCount } from 'utils/printPageEstimate';

type ReportForms = FloodDto[] | DroughtDto[] | IncidentDto[];

type LocationRow = {
  province?: string | number;
  district?: string | number;
  commune?: string | number;
};

type TableMapping = {
  columns: GridColDef[] | ((detailed: boolean) => GridColDef[]);
  columnGroup: GridColumnGroupingModel;
};

const resolveMappingColumns = (
  columns: TableMapping['columns'],
  isCommuneLevel: boolean,
): GridColDef[] =>
  typeof columns === 'function' ? columns(isCommuneLevel) : columns;

/** Match location column widths in tableFormatting. Print remaps village later. */
export const withPrintLocationColumns = (
  metricColumns: GridColDef[],
  isCommuneLevel: boolean,
): GridColDef[] =>
  isCommuneLevel
    ? [
        { field: KoboCommonKeys.location, width: 300 },
        { field: KoboCommonKeys.village, width: 300 },
        ...metricColumns,
      ]
    : [
        { field: KoboCommonKeys.province, width: 200 },
        { field: KoboCommonKeys.district, width: 72 },
        { field: KoboCommonKeys.commune, width: 84 },
        { field: KoboCommonKeys.village, width: 300 },
        ...metricColumns,
      ];

const toPrintTables = (
  mappings: TableMapping[],
  isCommuneLevel: boolean,
): Array<{ columns: GridColDef[]; columnGroup: GridColumnGroupingModel }> =>
  mappings.map(mapping => ({
    columns: withPrintLocationColumns(
      resolveMappingColumns(mapping.columns, isCommuneLevel),
      isCommuneLevel,
    ),
    columnGroup: mapping.columnGroup,
  }));

/**
 * Rows the print DataGrid actually chunks: commune reports insert province
 * and district subtotals, plus a Total row when more than one province.
 */
export const countPrintGridRows = (
  rows: LocationRow[],
  isCommuneLevel: boolean,
): number => {
  if (rows.length === 0) {
    return 0;
  }

  if (!isCommuneLevel) {
    return rows.length > 1 ? rows.length + 1 : rows.length;
  }

  const provinceCount = new Set(rows.map(row => String(row.province ?? '')))
    .size;
  const districtCount = new Set(rows.map(row => String(row.district ?? '')))
    .size;
  const dataRows = provinceCount + districtCount + rows.length;

  return provinceCount > 1 ? dataRows + 1 : dataRows;
};

const estimateFromReport = (
  rows: LocationRow[],
  mappings: TableMapping[],
  isCommuneLevel: boolean,
): number =>
  estimatePrintPageCount(
    countPrintGridRows(rows, isCommuneLevel),
    toPrintTables(mappings, isCommuneLevel),
  );

const estimateFloodPages = (
  forms: FloodDto[],
  isCommuneLevel: boolean,
  isAllColumnReport: boolean,
): number => {
  const formattedForms = filterFloodReports(
    forms.map(form => formatFloodFields(form)),
  );
  const report = isCommuneLevel
    ? generateFloodCommuneLevelReport(formattedForms)
    : generateFloodProvinceLevelReport(formattedForms);
  const mappings = isAllColumnReport
    ? floodReportTablesMapping
    : [SummaryFloodReportColumnSettings];

  return estimateFromReport(report, mappings, isCommuneLevel);
};

const estimateDroughtPages = (
  forms: DroughtDto[],
  isCommuneLevel: boolean,
  isAllColumnReport: boolean,
): number => {
  const formattedForms = forms.map(form => formatDroughtFields(form));
  const report = isCommuneLevel
    ? generateDroughtCommuneLevelReport(formattedForms)
    : generateDroughtProvinceLevelReport(formattedForms);
  const mappings = isAllColumnReport
    ? droughtReportTablesMapping
    : [SummaryDroughtReportColumnSettings];

  return estimateFromReport(report, mappings, isCommuneLevel);
};

const estimateIncidentPages = (
  forms: IncidentDto[],
  isCommuneLevel: boolean,
  isAllColumnReport: boolean,
): number => {
  const formattedForms = forms.map(form => formatIncidentFields(form));
  const groupedData = groupBy(formattedForms, KoboCommonKeys.disTyp);
  const reports = map(groupedData, incidentSpecificForms =>
    isCommuneLevel
      ? generateIncidentCommuneLevelReport(incidentSpecificForms)
      : generateIncidentProvinceLevelReport(incidentSpecificForms),
  );
  const mappings = isAllColumnReport
    ? incidentTablesMapping
    : [SummaryIncidentReportColumnSettings];

  const tablePages = reports.reduce(
    (pages, report) =>
      pages + estimateFromReport(report, mappings, isCommuneLevel),
    0,
  );
  const typeBreaks = Math.max(0, reports.length - 1);

  return tablePages + typeBreaks;
};

export const estimateReportPrintPages = (
  forms: ReportForms,
  isCommuneLevelReport: boolean,
  isAllColumnReport: boolean,
): number => {
  if (forms.length === 0) {
    return 0;
  }

  if (isFloodArray(forms)) {
    return estimateFloodPages(forms, isCommuneLevelReport, isAllColumnReport);
  }

  if (isDroughtArray(forms)) {
    return estimateDroughtPages(forms, isCommuneLevelReport, isAllColumnReport);
  }

  return estimateIncidentPages(forms, isCommuneLevelReport, isAllColumnReport);
};
