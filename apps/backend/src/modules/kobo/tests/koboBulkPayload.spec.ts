import { toKoboBulkData } from '../koboBulkPayload';

describe('toKoboBulkData', () => {
  it('stringifies numbers and drops unmapped keys', () => {
    expect(
      toKoboBulkData({
        'g3/g3_1/g3_2/NumFamAff': 50,
        undefined: '010203',
        empty: '',
        ok: '1',
      }),
    ).toEqual({
      'g3/g3_1/g3_2/NumFamAff': '50',
      ok: '1',
    });
  });
});
