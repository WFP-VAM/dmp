export const toKoboBulkValue = (value: unknown): string | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return undefined;
};

export const toKoboBulkData = (fieldsToUpdate: Record<string, unknown>): Record<string, string> => {
  const data: Record<string, string> = {};

  for (const [key, value] of Object.entries(fieldsToUpdate)) {
    if (key === '' || key === 'undefined') {
      continue;
    }

    const next = toKoboBulkValue(value);
    if (next !== undefined) {
      data[key] = next;
    }
  }

  return data;
};
