import { countAgg } from '../countAgg';

describe('countAgg', () => {
  it('should count the different values without duplicates', () => {
    const group = [
      { a: 'v1', b: 'v1' },
      { a: 'v1', b: 'v2' },
      { a: 'v2', b: 'v1' },
    ];
    expect(countAgg('a', group)).toEqual({ a: 2 });
  });
  it('should not count undefined and empty string', () => {
    const group = [
      { a: 'v1', b: 'v1' },
      { b: 'v2' },
      { a: 'v2', b: 'v1' },
      { a: '', b: 'v1' },
    ];
    expect(countAgg('a', group)).toEqual({ a: 2 });
  });
  it('should return undefined value if key not present', () => {
    const group = [{ a: 'v1', b: 'v1' }, { b: 'v2' }, { a: 'v2', b: 'v1' }];
    expect(countAgg('c', group)).toEqual({ c: undefined });
  });
});
