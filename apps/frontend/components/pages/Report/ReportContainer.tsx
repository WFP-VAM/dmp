import { Box, Skeleton } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { Report } from 'components/Report/Report';
import { useGetForms } from 'services/api/kobo/useGetForms';

const defaultSearchReportData: SearchFormData = {
  disTyp: DisasterMapping['flood'],
  region: {
    province: '',
    district: '',
    commune: '',
  },
  dateRange: {
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs(),
  },
};

export const ReportContainer = () => {
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  const { data: formsData, isLoading } = useGetForms(searchReportData);

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
      {(isLoading || formsData === undefined) && (
        <Skeleton
          variant="rounded"
          sx={{ minWidth: 800, minHeight: 400, mt: 5 }}
        />
      )}
      {formsData !== undefined && formsData.length > 0 && (
        <Report forms={formsData} />
      )}
    </Box>
  );
};
