import {
  GridColDef,
  GridColumnGroupingModel,
  GridColumnNode,
  isLeaf,
} from '@mui/x-data-grid';
import { sum } from 'lodash';

/** Usable width on A4 landscape after print margins (px). */
export const PRINTABLE_WIDTH_PX = 1000;

/** Do not scale text below this factor — use column bands instead. */
export const MIN_PRINT_SCALE = 0.65;

export const LOCATION_COLUMN_FIELDS = new Set([
  'province',
  'district',
  'commune',
  'village',
  'location',
]);

/** Use horizontal column bands above this content width (all-columns reports). */
export const COLUMN_BAND_MIN_WIDTH = 2200;

export const getPrintScale = (contentWidth: number): number => {
  if (contentWidth <= PRINTABLE_WIDTH_PX) {
    return 1;
  }

  return Math.max(MIN_PRINT_SCALE, PRINTABLE_WIDTH_PX / contentWidth);
};

export const shouldUseColumnBands = (contentWidth: number): boolean =>
  contentWidth > COLUMN_BAND_MIN_WIDTH;

export const getMaxBandContentWidth = (): number =>
  PRINTABLE_WIDTH_PX / MIN_PRINT_SCALE;

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

export const splitColumnsForPrint = (
  columns: GridColDef[],
  columnGroup: GridColumnGroupingModel,
  maxBandWidth: number,
): PrintColumnBand[] => {
  const locationColumns = columns.filter(column =>
    LOCATION_COLUMN_FIELDS.has(column.field),
  );
  const metricColumns = columns.filter(
    column => !LOCATION_COLUMN_FIELDS.has(column.field),
  );
  const locationWidth = sum(locationColumns.map(column => column.width ?? 0));
  const availableMetricWidth = maxBandWidth - locationWidth;

  if (
    metricColumns.length === 0 ||
    availableMetricWidth <= 0 ||
    getColumnsWidth(columns) <= maxBandWidth
  ) {
    return [
      {
        columns,
        columnGroup,
        width: getColumnsWidth(columns),
      },
    ];
  }

  const metricBands: GridColDef[][] = [];
  let currentBand: GridColDef[] = [];
  let currentWidth = 0;

  for (const column of metricColumns) {
    const columnWidth = column.width ?? 0;

    if (
      currentBand.length > 0 &&
      currentWidth + columnWidth > availableMetricWidth
    ) {
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

  if (metricBands.length <= 1) {
    return [
      {
        columns,
        columnGroup,
        width: getColumnsWidth(columns),
      },
    ];
  }

  return metricBands.map(metricBand => {
    const bandColumns = [...locationColumns, ...metricBand];
    const bandFields = new Set(bandColumns.map(column => column.field));

    return {
      columns: bandColumns,
      columnGroup: filterColumnGroup(columnGroup, bandFields),
      width: getColumnsWidth(bandColumns),
    };
  });
};
