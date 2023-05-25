import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DateRange, DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { Region, RegionFilters } from './RegionFilters';

export interface SearchFormData {
  disTyps: string[];
  dateRange: DateRange;
  region: Region;
}

export const SearchFilters = ({
  initSearchFormData,
  setSearchFormData,
  submitButtonContent,
}: {
  initSearchFormData: SearchFormData;
  setSearchFormData: Dispatch<SetStateAction<SearchFormData>>;
  submitButtonContent: JSX.Element;
}): JSX.Element => {
  const { control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: initSearchFormData,
  });

  const submitHandler = (data: SearchFormData) => {
    setSearchFormData(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="region"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RegionFilters value={value} onChange={onChange} />
        )}
      />
      <Controller
        name={'disTyps'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DisasterFilter value={value} onChange={onChange} />
        )}
      />
      <Controller
        name="dateRange"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateRangeFilter value={value} onChange={onChange} />
        )}
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button sx={{ color: 'white' }} type="submit">
          {submitButtonContent}
        </Button>
      </Box>
    </form>
  );
};
