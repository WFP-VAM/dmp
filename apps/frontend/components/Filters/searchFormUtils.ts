import { DateRange } from './DateRangeFilter';
import { Region } from './RegionFilters';
import { SearchFormData } from './types';

/**
 * Compare arrays of strings (sorted for comparison)
 */
export const areStringArraysEqual = (a: string[], b: string[]): boolean => {
  return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
};

/**
 * Compare date ranges (handling dayjs objects)
 */
export const areDateRangesEqual = (a: DateRange, b: DateRange): boolean => {
  const aStart = a.startDate?.toISOString();
  const bStart = b.startDate?.toISOString();
  const aEnd = a.endDate?.toISOString();
  const bEnd = b.endDate?.toISOString();

  return aStart === bStart && aEnd === bEnd;
};

/**
 * Compare regions
 */
export const areRegionsEqual = (a: Region, b: Region): boolean => {
  return (
    areStringArraysEqual(a.province, b.province) &&
    areStringArraysEqual(a.district, b.district) &&
    areStringArraysEqual(a.commune, b.commune)
  );
};

/**
 * Deep comparison helper for SearchFormData
 * Handles dayjs objects by comparing their ISO strings
 */
export const isFormDataEqual = (
  a: SearchFormData,
  b: SearchFormData,
): boolean => {
  return (
    areStringArraysEqual(a.disTyps, b.disTyps) &&
    areDateRangesEqual(a.dateRange, b.dateRange) &&
    areRegionsEqual(a.region, b.region)
  );
};
