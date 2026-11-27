// Kobo numeric fields are counts and must be >= 0 (Kobo constraint `. >= 0`).
export const isNegativeNumber = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') return false;
  const numberValue = Number(value);

  return !Number.isNaN(numberValue) && numberValue < 0;
};
