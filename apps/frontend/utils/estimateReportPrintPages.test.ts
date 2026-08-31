import { floodReportTablesMapping } from 'components/Report/FloodReport/floodReportTablesMapping';

import {
  countPrintGridRows,
  withPrintLocationColumns,
} from './estimateReportPrintPages';
import { MAX_PRINT_PAGES, PRINT_ROWS_PER_CHUNK } from './printLayout';
import {
  estimatePrintPageCount,
  isPrintOverPageCap,
} from './printPageEstimate';

describe('countPrintGridRows', () => {
  it('adds a Total row for province reports with more than one row', () => {
    expect(
      countPrintGridRows([{ province: '01' }, { province: '02' }], false),
    ).toBe(3);
    expect(countPrintGridRows([{ province: '01' }], false)).toBe(1);
  });

  it('counts province and district subtotals on commune reports', () => {
    const rows = [
      { province: '01', district: '0101', commune: '010101' },
      { province: '01', district: '0101', commune: '010102' },
      { province: '02', district: '0201', commune: '020101' },
    ];

    // 2 provinces + 2 districts + 3 communes + Total
    expect(countPrintGridRows(rows, true)).toBe(8);
  });
});

describe('detailed flood commune print cap', () => {
  const detailedFloodTables = floodReportTablesMapping.map(mapping => ({
    columns: withPrintLocationColumns(
      typeof mapping.columns === 'function'
        ? mapping.columns(true)
        : mapping.columns,
      true,
    ),
    columnGroup: mapping.columnGroup,
  }));

  it('stays under the cap for one chunk of communes', () => {
    const pages = estimatePrintPageCount(
      PRINT_ROWS_PER_CHUNK,
      detailedFloodTables,
    );

    expect(pages).toBeGreaterThan(0);
    expect(isPrintOverPageCap(pages)).toBe(false);
  });

  it('goes over the cap once column bands × chunks exceed MAX_PRINT_PAGES', () => {
    const pages = estimatePrintPageCount(
      PRINT_ROWS_PER_CHUNK * 3,
      detailedFloodTables,
    );

    expect(pages).toBeGreaterThan(MAX_PRINT_PAGES);
    expect(isPrintOverPageCap(pages)).toBe(true);
  });
});
