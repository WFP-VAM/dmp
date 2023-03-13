import { formatDateToStringDate, substractDaysToDate } from './date';

describe('Test date utils', () => {
  it('should substract the number of days from a date', () => {
    const initialDate = new Date('2018-11-04T00:00:00.000Z');
    const expectedDate = new Date('2018-10-25T00:00:00.000Z');
    expect(substractDaysToDate(initialDate, 10)).toEqual(expectedDate);
  });

  it('should format the date to a string date', () => {
    const initialDate = new Date('2018-11-04T00:00:00.000Z');
    expect(formatDateToStringDate(initialDate)).toEqual('2018-11-04');
  });
});
