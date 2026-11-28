import { formatVillageValues } from './formatRawToForm';

describe('formatVillageValues', () => {
  it('converts Kobo select_multiple values to village codes', () => {
    expect(formatVillageValues('01020301 01020302')).toEqual([
      '01020301',
      '01020302',
    ]);
  });

  it('handles missing village selections', () => {
    expect(formatVillageValues(undefined)).toEqual([]);
  });
});
