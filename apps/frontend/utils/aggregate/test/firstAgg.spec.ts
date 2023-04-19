import { firstAgg } from '../firstAgg';

describe('firstAgg', () => {
  it('should return the first non undefined value', () => {
    const group = [{ b: 'v1' }, { a: '3', b: 'v2' }, { a: '4', b: 'v1' }];
    expect(firstAgg('a', group)).toEqual({ a: '3' });
  });
  it('should return undefined if no keys', () => {
    const group = [{ b: 'v1' }, { b: 'v2' }];
    expect(firstAgg('a', group)).toEqual({ a: undefined });
  });
});
