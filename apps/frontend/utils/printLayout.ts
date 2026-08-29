import {
  GridColDef,
  GridColumnGroupingModel,
  GridColumnNode,
  isLeaf,
} from '@mui/x-data-grid';
import { sum } from 'lodash';

/** A4 landscape short-side × long-side in mm. */
const A4_LANDSCAPE_WIDTH_MM = 297;

/** Must match `@page { margin }` in PrintWrapper. */
export const PRINT_PAGE_MARGIN_MM = 8;

/** 96 CSS px per inch. */
const CSS_PX_PER_MM = 96 / 25.4;

/** Zoom/rounding haircut so the last column is not clipped. */
const PRINT_WIDTH_SAFETY_PX = 16;

/** Left inset on the printed grid; match PrintHeader `padding: 2rem`. */
export const PRINT_TABLE_LEFT_GUTTER_PX = 32;

/** Usable width for the scaled grid after page margin, safety, and left gutter. */
export const PRINTABLE_WIDTH_PX =
  Math.floor(
    (A4_LANDSCAPE_WIDTH_MM - PRINT_PAGE_MARGIN_MM * 2) * CSS_PX_PER_MM,
  ) -
  PRINT_WIDTH_SAFETY_PX -
  PRINT_TABLE_LEFT_GUTTER_PX;

/** Do not scale text below this factor — use column bands instead. */
export const MIN_PRINT_SCALE = 0.65;

export const LOCATION_COLUMN_FIELDS = new Set([
  'province',
  'district',
  'commune',
  'village',
  'location',
]);

/** Use horizontal column bands when min-scale still overflows the page. */
export const COLUMN_BAND_MIN_WIDTH = PRINTABLE_WIDTH_PX / MIN_PRINT_SCALE;

/** Narrower Villages Reported column when printing compact "+N" labels. */
export const PRINT_VILLAGE_COLUMN_PRINT_WIDTH = 140;

/** Print row chunks. Must match DisasterTable print paging. */
export const PRINT_ROWS_PER_CHUNK = 25;

/**
 * Guard for `window.print` / react-to-print.
 * Counts print blocks (tables × column bands × row chunks), which tracks A4
 * landscape pages for detailed reports. Raise or lower this number to retune.
 */
export const MAX_PRINT_PAGES = 25;

export const getPrintScale = (contentWidth: number): number => {
  if (contentWidth <= PRINTABLE_WIDTH_PX) {
    return 1;
  }

  return Math.max(MIN_PRINT_SCALE, PRINTABLE_WIDTH_PX / contentWidth);
};

export const shouldUseColumnBands = (contentWidth: number): boolean =>
  contentWidth > getMaxBandContentWidth();

export const getMaxBandContentWidth = (): number => COLUMN_BAND_MIN_WIDTH;

const getColumnsWidth = (columns: GridColDef[]): number =>
  sum(columns.map(column => column.width ?? 0)) + 2;

const filterColumnGroupNodes = (
  nodes: GridColumnNode[],
  fields: Set<string>,
): GridColumnNode[] => {
  const filtered: GridColumnNode[] = [];

  for (const node of nodes) {
    if (isLeaf(node)) {
      if (fields.has(node.field)) {
        filtered.push(node);
      }
      continue;
    }

    const children = filterColumnGroupNodes(node.children, fields);

    if (children.length > 0) {
      filtered.push({ ...node, children } as GridColumnNode);
    }
  }

  return filtered;
};

const filterColumnGroup = (
  columnGroup: GridColumnGroupingModel,
  fields: Set<string>,
): GridColumnGroupingModel => {
  const filtered: GridColumnGroupingModel = [];

  for (const group of columnGroup) {
    const children = filterColumnGroupNodes(group.children, fields);

    if (children.length > 0) {
      filtered.push({ ...group, children });
    }
  }

  return filtered;
};

export interface PrintColumnBand {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  width: number;
}

const toPrintBand = (
  columns: GridColDef[],
  columnGroup: GridColumnGroupingModel,
): PrintColumnBand => ({
  columns,
  columnGroup,
  width: getColumnsWidth(columns),
});

const splitLocationAndMetricColumns = (columns: GridColDef[]) => ({
  locationColumns: columns.filter(column =>
    LOCATION_COLUMN_FIELDS.has(column.field),
  ),
  metricColumns: columns.filter(
    column => !LOCATION_COLUMN_FIELDS.has(column.field),
  ),
});

const getLocationWidth = (locationColumns: GridColDef[]): number =>
  sum(locationColumns.map(column => column.width ?? 0));

const packMetricColumnsIntoBands = (
  metricColumns: GridColDef[],
  availableMetricWidth: number,
): GridColDef[][] => {
  const metricBands: GridColDef[][] = [];
  let currentBand: GridColDef[] = [];
  let currentWidth = 0;

  for (const column of metricColumns) {
    const columnWidth = column.width ?? 0;
    const exceedsBandWidth =
      currentBand.length > 0 &&
      currentWidth + columnWidth > availableMetricWidth;

    if (exceedsBandWidth) {
      metricBands.push(currentBand);
      currentBand = [column];
      currentWidth = columnWidth;
      continue;
    }

    currentBand.push(column);
    currentWidth += columnWidth;
  }

  if (currentBand.length > 0) {
    metricBands.push(currentBand);
  }

  return metricBands;
};

const toBandFromParts = (
  locationColumns: GridColDef[],
  metricColumns: GridColDef[],
  columnGroup: GridColumnGroupingModel,
): PrintColumnBand => {
  const bandColumns = [...locationColumns, ...metricColumns];
  const bandFields = new Set(bandColumns.map(column => column.field));

  return {
    columns: bandColumns,
    columnGroup: filterColumnGroup(columnGroup, bandFields),
    width: getColumnsWidth(bandColumns),
  };
};

export const splitColumnsForPrint = (
  columns: GridColDef[],
  columnGroup: GridColumnGroupingModel,
  maxBandWidth: number,
): PrintColumnBand[] => {
  const { locationColumns, metricColumns } =
    splitLocationAndMetricColumns(columns);
  const availableMetricWidth = maxBandWidth - getLocationWidth(locationColumns);
  const fitsOnSingleBand =
    metricColumns.length === 0 ||
    availableMetricWidth <= 0 ||
    getColumnsWidth(columns) <= maxBandWidth;

  if (fitsOnSingleBand) {
    return [toPrintBand(columns, columnGroup)];
  }

  const metricBands = packMetricColumnsIntoBands(
    metricColumns,
    availableMetricWidth,
  );

  if (metricBands.length <= 1) {
    return [toPrintBand(columns, columnGroup)];
  }

  return metricBands.map(metricBand =>
    toBandFromParts(locationColumns, metricBand, columnGroup),
  );
};
