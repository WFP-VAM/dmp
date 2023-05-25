import PrintIcon from '@mui/icons-material/Print';
import { Box, IconButton, Skeleton } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useReactToPrint } from 'react-to-print';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { PrintHeader } from 'components/PrintHeader';
import { PrintWrapper } from 'components/PrintWrapper';
import { Report } from 'components/Report/Report';
import { ReportSwitch } from 'components/ReportSwitch';
import { useGetForms } from 'services/api/kobo/useGetForms';
import { dropNotApproved } from 'utils/dropNotApproved';

const defaultSearchReportData: SearchFormData = {
  disTyps: [DisasterMapping['flood']],
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

  const [isDetailedReport, setIsDetailedReport] = useState(false);

  const { data: formsData, isLoading } = useGetForms(searchReportData);

  const filteredFormsData = useMemo(() => {
    return formsData !== undefined ? dropNotApproved(formsData) : undefined;
  }, [formsData]);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
      <Box display="flex">
        <ReportSwitch
          value={isDetailedReport}
          onChange={(event, checked) => {
            setIsDetailedReport(checked);
          }}
        />
        <IconButton onClick={handlePrint} color="primary">
          <PrintIcon />
        </IconButton>
      </Box>
      {(isLoading || filteredFormsData === undefined) && (
        <Skeleton
          variant="rounded"
          sx={{ minWidth: 800, minHeight: 400, mt: 5 }}
        />
      )}
      {filteredFormsData !== undefined && (
        <>
          <PrintWrapper printRef={printRef}>
            <PrintHeader searchReportData={searchReportData} />
            <Report
              forms={filteredFormsData}
              isDetailedReport={isDetailedReport}
            />
          </PrintWrapper>
          <Box display="flex" justifyContent="left">
            <IconButton onClick={handlePrint} color="primary">
              <PrintIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};
