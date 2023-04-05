import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';

const defaultSearchReportData: SearchFormData = {
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

export const ReportContainer = () => {
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters
        initSearchFormData={searchReportData}
        setSearchFormData={setSearchReportData}
        submitButtonContent={
          <FormattedMessage
            id="report_page.showReport"
            defaultMessage="Show Report"
          />
        }
      />
    </Box>
  );
};
