import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { TableDisplay } from 'components/TableDisplay';
import { useForms } from 'services/api/kobo/useForms';

const defaultSearchFormData: SearchFormData = {
  disTyp: DisasterMapping['flood'],
  region: {
    province: '',
    district: '',
    commune: '',
  },
  dateRange: {
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  },
};

export const FormSearch = () => {
  const [searchFormData, setSearchFormData] = useState(defaultSearchFormData);

  const { data: formData, isLoading } = useForms(searchFormData.disTyp);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters
        initSearchFormData={searchFormData}
        setSearchFormData={setSearchFormData}
      />
      <TableDisplay isLoading={isLoading} forms={formData} />
    </Box>
  );
};
