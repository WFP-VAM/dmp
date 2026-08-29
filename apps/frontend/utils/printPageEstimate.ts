import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { sum } from 'lodash';

import {
  getMaxBandContentWidth,
  MAX_PRINT_PAGES,
  PRINT_ROWS_PER_CHUNK,
  PRINT_VILLAGE_COLUMN_PRINT_WIDTH,
  shouldUseColumnBands,
  splitColumnsForPrint,
} from './printLayout';

const withPrintVillageWidth = (columns: GridColDef[]): GridColDef[] =>
  columns.map(column =>
    column.field === 'village'
      ? { ...column, width: PRINT_VILLAGE_COLUMN_PRINT_WIDTH }
      : column,
  );

const getColumnsWidth = (columns: GridColDef[]): number =>
  sum(columns.map(column => column.width ?? 0)) + 2;

/** How many print row-chunks a grid with this many rows will mount. */
export const countPrintChunks = (printRowCount: number): number => {
  if (printRowCount <= 0) {
    return 0;
  }

  return Math.ceil(printRowCount / PRINT_ROWS_PER_CHUNK);
};

/** Column bands used when printing this table. */
export const countPrintBands = (
  columns: GridColDef[],
  columnGroup: GridColumnGroupingModel = [],
): number => {
  const printColumns = withPrintVillageWidth(columns);
  const totalWidth = getColumnsWidth(printColumns);

  if (!shouldUseColumnBands(totalWidth)) {
    return 1;
  }

  return splitColumnsForPrint(
    printColumns,
    columnGroup,
    getMaxBandContentWidth(),
  ).length;
};

/**
 * Estimated print pages: tables × bands × chunks.
 * Overcounts slightly when short tables share a page; never undercounts.
 */
export const estimatePrintPageCount = (
  printRowCount: number,
  tables: Array<{
    columns: GridColDef[];
    columnGroup?: GridColumnGroupingModel;
  }>,
): number => {
  const chunks = countPrintChunks(printRowCount);

  if (chunks === 0 || tables.length === 0) {
    return 0;
  }

  return tables.reduce(
    (pages, table) =>
      pages + countPrintBands(table.columns, table.columnGroup ?? []) * chunks,
    0,
  );
};

export const isPrintOverPageCap = (pageCount: number): boolean =>
  pageCount > MAX_PRINT_PAGES;
