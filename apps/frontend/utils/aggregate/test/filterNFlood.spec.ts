import { filterNFlood } from '../filterNFlood';

describe('filterNFlood', () => {
  it('should keep the last flood number', () => {
    const data = [
      { commune: '10', disasterDate: '2022-01-20', floodN: '1', extra: 'b' },
      { commune: '10', disasterDate: '2023-01-20', floodN: '1', extra: 'a' },
      { commune: '10', disasterDate: '2023-01-21', floodN: '1', extra: 'a' },
      { commune: '10', disasterDate: '2023-01-23', floodN: '1', extra: 'b' },
      { commune: '10', disasterDate: '2023-01-29', floodN: '2', extra: 'b' },
      { commune: '10', disasterDate: '2023-01-28', floodN: '2', extra: 'a' },
      { commune: '20', disasterDate: '2023-01-20', floodN: '1', extra: 'b' },
    ];

    const expectedData = [
      { commune: '10', disasterDate: '2022-01-20', floodN: '1', extra: 'b' },
      { commune: '10', disasterDate: '2023-01-23', floodN: '1', extra: 'b' },
      { commune: '10', disasterDate: '2023-01-29', floodN: '2', extra: 'b' },
      { commune: '20', disasterDate: '2023-01-20', floodN: '1', extra: 'b' },
    ];
    expect(filterNFlood(data, 'commune', 'disasterDate', 'floodN')).toEqual(
      expectedData,
    );
  });
});
