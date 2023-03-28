import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { DateRange, DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { RegionFilter } from './RegionFilter';

interface SearchFormData {
  disTyp: string;
  dateRange: DateRange;
}

export const SearchFilters = ({
  setDisasterType,
}: {
  setDisasterType: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  const { control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      disTyp: '1',
      dateRange: {
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
      },
    },
  });

  const submitHandler = (data: SearchFormData) => {
    setDisasterType(data.disTyp);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name={'disTyp'}
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
      {/* <DisasterFilter control={control} /> */}
      <Controller
        name="province"
        defaultValue={'01'}
        control={control}
        render={({ field: { value, onChange } }) => (
          <RegionFilter value={value} onChange={onChange} />
        )}
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button sx={{ color: 'white' }} type="submit">
          <FormattedMessage
            id="navigation.forms.search"
            defaultMessage="Search"
          />
        </Button>
      </Box>
    </form>
  );
};
