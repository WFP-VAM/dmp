import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date,
  formatStr = 'DD/MM/YYYY',
): string => {
  return dayjs(date).format(formatStr);
};
