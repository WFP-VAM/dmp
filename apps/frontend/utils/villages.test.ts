import { getVillageOptions, isVillageInCommune } from './villages';

// Codes as stored in Kobo and villages.json
const allVillages = [
  // Banteay Neang, Mongkol Borei, Banteay Meanchey (province 01)
  '1020101',
  '1020102',
  '1020103',
  // Bat Trang, Mongkol Borei, Banteay Meanchey (province 01)
  '1020201',
  // Chhloung, Kratie (province 10)
  '10010101',
  '10010102',
  // Damrei Phong, Chhloung, Kratie (province 10)
  '10010201',
];

describe('isVillageInCommune', () => {
  it('matches villages of a province 01-09 commune', () => {
    expect(isVillageInCommune('1020101', '010201')).toBe(true);
    expect(isVillageInCommune('01020101', '010201')).toBe(true);
    expect(isVillageInCommune('1020201', '010201')).toBe(false);
  });

  it('matches villages of a province 10+ commune', () => {
    expect(isVillageInCommune('10010101', '100101')).toBe(true);
    expect(isVillageInCommune('10010201', '100101')).toBe(false);
  });

  it('does not mix up communes across provinces', () => {
    expect(isVillageInCommune('10010101', '010201')).toBe(false);
    expect(isVillageInCommune('1020101', '100101')).toBe(false);
  });
});

describe('getVillageOptions', () => {
  it('lists the villages of a Banteay Meanchey commune', () => {
    expect(getVillageOptions(allVillages, ['010201'])).toEqual([
      '1020101',
      '1020102',
      '1020103',
    ]);
  });

  it('lists the villages of a Kratie commune', () => {
    expect(getVillageOptions(allVillages, ['100101'])).toEqual([
      '10010101',
      '10010102',
    ]);
  });

  it('keeps selected villages that cannot be matched', () => {
    expect(
      getVillageOptions(allVillages, ['010201'], ['1020103', '9999999']),
    ).toEqual(['1020101', '1020102', '1020103', '9999999']);
  });

  it('returns only the selected villages when no commune is selected', () => {
    expect(getVillageOptions(allVillages, [], ['1020101'])).toEqual([
      '1020101',
    ]);
  });
});
