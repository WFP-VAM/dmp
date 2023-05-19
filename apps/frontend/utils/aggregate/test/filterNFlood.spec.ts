import { filterNFlood } from '../filterNFlood';

describe('filterNFlood', () => {
  it('should keep the last flood number', () => {
    const data = [
      {
        commune: '10',
        disasterDate: '2022-01-20',
        floodN: '1',
        extra: 'b',
        submissionTime: '2022-01-26',
      },
      {
        commune: '10',
        disasterDate: '2023-01-20',
        floodN: '1',
        extra: 'a',
        submissionTime: '2022-01-25',
      },
      {
        commune: '10',
        disasterDate: '2023-01-21',
        floodN: '1',
        extra: 'a',
        submissionTime: '2022-01-25',
      },
      {
        commune: '10',
        disasterDate: '2023-01-23',
        floodN: '1',
        extra: 'b',
        submissionTime: '2023-01-27',
      },
      {
        commune: '10',
        disasterDate: '2023-01-29',
        floodN: '2',
        extra: 'b',
        submissionTime: '2022-01-27',
      },
      {
        commune: '10',
        disasterDate: '2023-01-28',
        floodN: '2',
        extra: 'a',
        submissionTime: '2022-01-25',
      },
      {
        commune: '20',
        disasterDate: '2023-01-20',
        floodN: '1',
        extra: 'b',
        submissionTime: '2022-01-25',
      },
    ];

    const expectedData = [
      {
        commune: '10',
        disasterDate: '2022-01-20',
        floodN: '1',
        extra: 'b',
        submissionTime: '2022-01-26',
      },
      {
        commune: '10',
        disasterDate: '2023-01-23',
        floodN: '1',
        extra: 'b',
        submissionTime: '2023-01-27',
      },
      {
        commune: '10',
        disasterDate: '2023-01-29',
        floodN: '2',
        extra: 'b',
        submissionTime: '2022-01-27',
      },
      {
        commune: '20',
        disasterDate: '2023-01-20',
        floodN: '1',
        extra: 'b',
        submissionTime: '2022-01-25',
      },
    ];
    expect(filterNFlood(data, 'commune', 'disasterDate', 'floodN')).toEqual(
      expectedData,
    );
  });
});
