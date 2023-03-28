import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { DateRange, DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { CommuneFilter, DistrictFilter, ProvinceFilter } from './RegionFilters';

interface SearchFormData {
  disTyp: string;
  dateRange: DateRange;
  province: string;
  district: string;
  commune: string;
}

export const SearchFilters = ({
  setDisasterType,
}: {
  setDisasterType: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  const { control, handleSubmit, watch } = useForm<SearchFormData>({
    defaultValues: {
      disTyp: '1',
      province: '01',
      district: '',
      commune: '',
      dateRange: {
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
      },
    },
  });

  const submitHandler = (data: SearchFormData) => {
    setDisasterType(data.disTyp);
  };
  const [provinceValue, districtValue] = watch(['province', 'district']);

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
        )}
      />
      <Controller
        name="province"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ProvinceFilter value={value} onChange={onChange} />
        )}
      />
      <Controller
        name="district"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DistrictFilter
            value={value}
            onChange={onChange}
            provinceValue={provinceValue}
          />
        )}
      />
      <Controller
        name="commune"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CommuneFilter
            value={value}
            onChange={onChange}
            districtValue={districtValue}
          />
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
