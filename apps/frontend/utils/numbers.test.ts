import { isNegativeNumber } from './numbers';

describe('isNegativeNumber', () => {
  it('flags negative values', () => {
    expect(isNegativeNumber(-1)).toBe(true);
    expect(isNegativeNumber('-3')).toBe(true);
    expect(isNegativeNumber('-0.5')).toBe(true);
  });

  it('accepts zero, positive and empty values', () => {
    expect(isNegativeNumber(0)).toBe(false);
    expect(isNegativeNumber('0')).toBe(false);
    expect(isNegativeNumber('12')).toBe(false);
    expect(isNegativeNumber('')).toBe(false);
    expect(isNegativeNumber(undefined)).toBe(false);
    expect(isNegativeNumber(null)).toBe(false);
  });

  it('ignores non numeric values', () => {
    expect(isNegativeNumber('abc')).toBe(false);
  });
});
