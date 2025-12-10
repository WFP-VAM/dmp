import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { TableDisplay } from 'components/TableDisplay';
import { useGetForms } from 'services/api/kobo/useGetForms';

export const FormSearch = () => {
  const router = useRouter();
  const { disTyp, startDate, endDate } = router.query;

  // TODO add security for the query params
  const defaultSearchFormData: SearchFormData = {
    disTyps: [
      disTyp === undefined ? DisasterMapping['flood'] : (disTyp as string),
    ],
    region: {
      province: [],
      district: [],
      commune: [],
    },
    dateRange: {
      startDate:
        startDate === undefined
          ? dayjs().subtract(1, 'month')
          : dayjs(startDate as string),
      endDate: endDate === undefined ? dayjs() : dayjs(endDate as string),
    },
  };

  const [searchFormData, setSearchFormData] = useState(defaultSearchFormData);

  const { data: formData, isLoading } = useGetForms(searchFormData);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters
        initSearchFormData={searchFormData}
        setSearchFormData={setSearchFormData}
        submitButtonContent={
          <FormattedMessage
            id="navigation.forms.search"
            defaultMessage="Search"
          />
        }
        autoSubmitOnDisasterChange={true}
      />
      <TableDisplay
        isLoading={isLoading}
        forms={formData}
        isFlood={searchFormData.disTyps[0] === DisasterMapping['flood']}
      />
    </Box>
  );
};
