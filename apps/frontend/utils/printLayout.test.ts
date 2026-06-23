import { GridColDef } from '@mui/x-data-grid';

import {
  getPrintScale,
  PRINTABLE_WIDTH_PX,
  shouldUseColumnBands,
  splitColumnsForPrint,
} from './printLayout';

const col = (field: string, width: number): GridColDef => ({ field, width });

describe('printLayout', () => {
  it('scales summary-width tables to fit the printable page', () => {
    expect(getPrintScale(1600)).toBe(0.65);
    expect(shouldUseColumnBands(1600)).toBe(false);
  });

  it('uses column bands for very wide all-columns tables', () => {
    expect(shouldUseColumnBands(1600)).toBe(false);
    expect(shouldUseColumnBands(4000)).toBe(true);

    const bands = splitColumnsForPrint(
      [
        col('province', 200),
        col('district', 72),
        col('commune', 84),
        col('village', 300),
        ...Array.from({ length: 20 }, (_, index) =>
          col(`metric${index}`, 96),
        ),
      ],
      [],
      PRINTABLE_WIDTH_PX / 0.65,
    );

    expect(bands.length).toBeGreaterThan(1);
    expect(bands.every(band => band.columns.some(c => c.field === 'province'))).toBe(
      true,
    );
  });
});
