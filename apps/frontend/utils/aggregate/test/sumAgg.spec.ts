import { sumAgg } from '../sumAgg';

describe('sumAgg', () => {
  it('should sum the different values', () => {
    const group = [
      { a: '1', b: 'v1' },
      { a: '3', b: 'v2' },
      { a: '3', b: 'v1' },
    ];
    expect(sumAgg('a', group)).toEqual({ a: 7 });
  });
  it('should sum the different values with undefined or empty string', () => {
    const group = [
      { a: '1', b: 'v1' },
      { b: 'v2' },
      { a: '', b: 'v1' },
      { a: undefined, b: 'v2' },
      { a: '3', b: 'v1' },
    ];
    expect(sumAgg('a', group)).toEqual({ a: 4 });
  });
  it('should return undefined value if key not present', () => {
    const group = [{ a: '1', b: 'v1' }, { b: 'v2' }, { a: '3', b: 'v1' }];
    expect(sumAgg('c', group)).toEqual({ c: undefined });
  });
});
