import { DateRange } from './DateRangeFilter';
import { Region } from './RegionFilters';

export interface SearchFormData {
  disTyps: string[];
  dateRange: DateRange;
  region: Region;
}
