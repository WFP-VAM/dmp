import { countCategoriesAgg } from '../countCategoriesAgg';

describe('countCategoriesAgg', () => {
  it('should count the different categories and create new keys', () => {
    const group = [
      { a: '1', b: 'v1' },
      { a: '1', b: 'v2' },
      { a: '2', b: 'v1' },
      { a: '3', b: 'v1' },
    ];
    expect(countCategoriesAgg('a', group)).toEqual({
      a_1: 2,
      a_2: 1,
      a_3: 1,
    });
  });
  it('should count the different categories and create new keys but not for undefined and empty string', () => {
    const group = [
      { a: '1', b: 'v1' },
      { a: '1', b: 'v2' },
      { a: '', b: 'v2' },
      { b: 'v1' },
      { a: '3', b: 'v1' },
    ];
    expect(countCategoriesAgg('a', group)).toEqual({
      a_1: 2,
      a_3: 1,
    });
  });
  it('should return undefined value if key not present', () => {
    const group = [{ b: 'v1' }, { b: 'v2' }];
    expect(countCategoriesAgg('a', group)).toEqual({ a: undefined });
  });
});
