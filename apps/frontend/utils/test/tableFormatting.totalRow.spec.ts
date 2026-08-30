import { GridColDef } from '@mui/x-data-grid';

import {
  TOTAL_ROW_ID,
  withTotalRowFirstColumnExport,
} from 'utils/tableFormatting';

type Row = Record<string, unknown>;

type ExportColumn = {
  field: string;
  valueGetter?: (value: unknown, row: Row) => unknown;
  valueFormatter?: (value: unknown, row: Row) => unknown;
};

const exportCell = (column: ExportColumn, row: Row): unknown => {
  const raw = row[column.field];
  const gotten =
    column.valueGetter === undefined ? raw : column.valueGetter(raw, row);

  return column.valueFormatter === undefined
    ? gotten
    : column.valueFormatter(gotten, row);
};

describe('withTotalRowFirstColumnExport', () => {
  it('keeps Total in CSV when location valueGetter rebuilds province-district-commune', () => {
    const locationColumn: GridColDef = {
      field: 'location',
      valueGetter: (
        _value,
        row: { province: string; district: string; commune: string },
      ) => `${row.province}-${row.district}-${row.commune}`,
      valueFormatter: value => {
        const [province, district, commune] = String(value)
          .split('-')
          .map(part => (part === 'undefined' ? undefined : part));

        return commune ?? district ?? province;
      },
    };

    const wrapped = withTotalRowFirstColumnExport(
      locationColumn,
      'Total',
    ) as ExportColumn;

    expect(exportCell(wrapped, { id: TOTAL_ROW_ID })).toBe('Total');
    expect(
      exportCell(wrapped, {
        id: 'row-1',
        province: 'p1',
        district: 'd1',
        commune: 'c1',
      }),
    ).toBe('c1');
  });

  it('keeps Total in CSV when province valueGetter looks up a translation id', () => {
    const provinceColumn: GridColDef = {
      field: 'province',
      valueGetter: (value: unknown) =>
        typeof value === 'string' && value !== '' ? `province.${value}` : value,
    };

    const wrapped = withTotalRowFirstColumnExport(
      provinceColumn,
      'Total',
    ) as ExportColumn;

    expect(exportCell(wrapped, { id: TOTAL_ROW_ID, province: 'Total' })).toBe(
      'Total',
    );
    expect(exportCell(wrapped, { id: 'row-1', province: 'p1' })).toBe(
      'province.p1',
    );
  });
});
