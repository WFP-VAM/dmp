import { GridColDef } from '@mui/x-data-grid';

import {
  getMaxBandContentWidth,
  getPrintScale,
  MAX_PRINT_PAGES,
  MIN_PRINT_SCALE,
  PRINT_ROWS_PER_CHUNK,
  PRINTABLE_WIDTH_PX,
  shouldUseColumnBands,
  splitColumnsForPrint,
} from './printLayout';
import {
  countPrintBands,
  countPrintChunks,
  estimatePrintPageCount,
  isPrintOverPageCap,
} from './printPageEstimate';

const col = (field: string, width: number): GridColDef => ({ field, width });

const wideTableColumns = [
  col('province', 200),
  col('district', 72),
  col('commune', 84),
  col('village', 300),
  ...Array.from({ length: 20 }, (_, index) => col(`metric${index}`, 96)),
];

describe('printLayout', () => {
  it('does not scale or band tables that already fit the page', () => {
    expect(getPrintScale(PRINTABLE_WIDTH_PX)).toBe(1);
    expect(shouldUseColumnBands(PRINTABLE_WIDTH_PX)).toBe(false);
  });

  it('bands when scaling down to MIN_PRINT_SCALE would still overflow', () => {
    const overflowWidth = getMaxBandContentWidth() + 1;

    expect(shouldUseColumnBands(overflowWidth)).toBe(true);
    expect(getPrintScale(getMaxBandContentWidth())).toBe(MIN_PRINT_SCALE);
  });

  it('packs wide tables into bands that fit after min scale', () => {
    expect(shouldUseColumnBands(4000)).toBe(true);

    const bands = splitColumnsForPrint(
      wideTableColumns,
      [],
      getMaxBandContentWidth(),
    );

    expect(bands.length).toBeGreaterThan(1);
    expect(
      bands.every(band => band.columns.some(c => c.field === 'province')),
    ).toBe(true);
    expect(
      bands.every(band => band.columns.some(c => c.field === 'village')),
    ).toBe(true);
    expect(
      bands.every(band => band.width <= getMaxBandContentWidth() + 96),
    ).toBe(true);
  });

  it('chunks print rows at PRINT_ROWS_PER_CHUNK', () => {
    expect(countPrintChunks(0)).toBe(0);
    expect(countPrintChunks(PRINT_ROWS_PER_CHUNK)).toBe(1);
    expect(countPrintChunks(PRINT_ROWS_PER_CHUNK + 1)).toBe(2);
  });

  it('counts one band when the table fits after min scale', () => {
    expect(countPrintBands([col('province', 200), col('metric', 72)])).toBe(1);
  });

  it('estimates pages as tables × bands × chunks', () => {
    const narrowTable = {
      columns: [col('province', 200), col('metric', 72)],
    };

    expect(estimatePrintPageCount(10, [narrowTable, narrowTable])).toBe(2);
    expect(
      estimatePrintPageCount(PRINT_ROWS_PER_CHUNK + 1, [narrowTable]),
    ).toBe(2);
  });

  it('treats MAX_PRINT_PAGES as an exclusive cap', () => {
    expect(MAX_PRINT_PAGES).toBe(25);
    expect(isPrintOverPageCap(MAX_PRINT_PAGES)).toBe(false);
    expect(isPrintOverPageCap(MAX_PRINT_PAGES + 1)).toBe(true);
  });
});
