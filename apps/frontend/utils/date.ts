import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date,
  formatStr = 'DD/MM/YYYY',
): string => {
  return dayjs(date).format(formatStr);
};

export const getDateWeek = (currentDate: Date = new Date()) => {
  const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    currentDate.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextMonday,
  );

  return currentDate < nextMonday
    ? 52
    : currentDate > nextMonday
    ? Math.ceil((+currentDate - +nextMonday) / (24 * 3600 * 1000) / 7)
    : 1;
};
