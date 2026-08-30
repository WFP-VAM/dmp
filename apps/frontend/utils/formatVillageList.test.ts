import { formatVillageListWithOverflow } from './formatVillageList';

describe('formatVillageListWithOverflow', () => {
  it('returns an empty string for no villages', () => {
    expect(formatVillageListWithOverflow([])).toBe('');
  });

  it('returns the full list when it fits', () => {
    expect(formatVillageListWithOverflow(['A Chen'])).toBe('A Chen');
    expect(formatVillageListWithOverflow(['A Chen', 'Ampok'], 2)).toBe(
      'A Chen, Ampok',
    );
  });

  it('shows the first village and the count of hidden ones', () => {
    expect(
      formatVillageListWithOverflow(['A Chen', 'Ampok', 'Angkrong', 'Balang']),
    ).toBe('A Chen +3');
  });
});
