import { aggregate } from '../aggregate';

describe('aggregate', () => {
  it('should aggregate the different values', () => {
    const groupKey = 'commune';
    const sumKeys = ['toSum', 'toSum2'];
    const countKeys = ['toCount', 'toCount2'];
    const countCategoriesKeys = ['toCountCategories'];
    const countMultipleChoicesKeys = ['toCountMultipleChoices'];
    const firstKeys = ['toFirst'];
    const data = [
      {
        commune: '1',
        toSum: '1',
        toSum2: '3',
        toCount: 'a',
        toCount2: 'a',
        toCountCategories: 'a',
        toCountMultipleChoices: '1 2 3',
        extra: 'v1',
      },
      {
        commune: '1',
        toSum: '1',
        toSum2: '1',
        toCount: 'b',
        toCount2: 'a',
        toFirst: 'first',
        toCountCategories: 'a',
        toCountMultipleChoices: '2 3',

        extra: 'v1',
      },
      {
        commune: '1',
        toCountCategories: 'b',
      },
      {
        commune: '2',
        toSum: '1',
        toSum2: '1',
        toCount: 'a',
        toCount2: 'a',
        extra: 'v1',
      },
      { commune: '2', extra: 'v1' },
    ];
    const expectedData = [
      {
        commune: '1',
        toSum: 2,
        toSum2: 4,
        toCount: 2,
        toCount2: 1,
        toFirst: 'first',
        toCountCategories_a: 2,
        toCountCategories_b: 1,
        toCountMultipleChoices_1: 1,
        toCountMultipleChoices_2: 2,
        toCountMultipleChoices_3: 2,
      },
      {
        commune: '2',
        toSum: 1,
        toSum2: 1,
        toCount: 1,
        toCount2: 1,
      },
    ];
    expect(
      aggregate({
        data,
        groupKey,
        sumKeys,
        countKeys,
        firstKeys,
        countCategoriesKeys,
        countMultipleChoicesKeys,
      }),
    ).toEqual(expectedData);
  });
  it('should work even without keys', () => {
    const groupKey = 'commune';
    const data = [
      { commune: '1', extra: 'v1' },
      { commune: '3', extra: 'v2' },
      { commune: '3', extra: 'v1' },
    ];
    expect(aggregate({ data, groupKey })).toEqual([
      { commune: '1' },
      { commune: '3' },
    ]);
  });
});
