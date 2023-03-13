export const substractDaysToDate = (date: Date, numDays: number): Date => {
  const updatedDate = new Date(date);

  updatedDate.setDate(updatedDate.getDate() - numDays);

  return updatedDate;
};

export const formatDateToStringDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
