import { GridColDef } from '@mui/x-data-grid';

import {
  getMaxBandContentWidth,
  getPrintScale,
  MIN_PRINT_SCALE,
  PRINTABLE_WIDTH_PX,
  shouldUseColumnBands,
  splitColumnsForPrint,
} from './printLayout';

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
});
