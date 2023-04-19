import { countMultipleChoicesAgg } from '../countMultipleChoicesAgg';

describe('countMultipleChoicesAgg', () => {
  it('should sum the different choices', () => {
    const group = [
      { a: '1 2 3', b: 'v1' },
      { a: '3', b: 'v2' },
      { a: '3 4', b: 'v1' },
    ];
    expect(countMultipleChoicesAgg('a', group)).toEqual({
      a_1: 1,
      a_2: 1,
      a_3: 3,
      a_4: 1,
    });
  });
  it('should not take into account undefined and empty string', () => {
    const group = [
      { a: '1 2 3', b: 'v1' },
      { a: '', b: 'v2' },
      { b: 'v2' },
      { a: '3 4', b: 'v1' },
    ];
    expect(countMultipleChoicesAgg('a', group)).toEqual({
      a_1: 1,
      a_2: 1,
      a_3: 2,
      a_4: 1,
    });
  });
  it('should return undefined value if key not present', () => {
    const group = [{ a: '1', b: 'v1' }, { b: 'v2' }, { a: '3', b: 'v1' }];
    expect(countMultipleChoicesAgg('c', group)).toEqual({ c: undefined });
  });
});
