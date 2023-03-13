export const substractDaysToDate = (date: Date, nbDays: number): Date => {
  const updatedDate = new Date(date);

  updatedDate.setDate(updatedDate.getDate() - nbDays);

  return updatedDate;
};
