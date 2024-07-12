import PrintIcon from '@mui/icons-material/Print';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useReactToPrint } from 'react-to-print';

import {
  SearchFilters,
  SearchFormData,
} from 'components/Filters/SearchFilters';
import { LabelSwitch } from 'components/LabelSwitch';
import { PrintHeader } from 'components/PrintHeader';
import { PrintWrapper } from 'components/PrintWrapper';
import { Report } from 'components/Report/Report';
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
  const [isAllColumnReport, setIsAllColumnReport] = useState(false);

  const { data: formsData, isLoading } = useGetForms(searchReportData);

  const filteredFormsData = useMemo(() => {
    return formsData !== undefined ? dropNotApproved(formsData) : [];
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
      <Box display="flex" alignItems="center">
        <Typography fontWeight="bold" sx={{ mr: 1 }}>
          <FormattedMessage id="report_page.data" />:
        </Typography>
        <LabelSwitch
          value={isAllColumnReport}
          onChange={(event, checked) => {
            setIsAllColumnReport(checked);
          }}
          labelUncheck={<FormattedMessage id="report_page.summary" />}
          labelCheck={<FormattedMessage id="report_page.all_columns" />}
        />
        <Typography fontWeight="bold" sx={{ mr: 1 }}>
          <FormattedMessage id="report_page.level" />:
        </Typography>
        <LabelSwitch
          value={isDetailedReport}
          onChange={(event, checked) => {
            setIsDetailedReport(checked);
          }}
          labelUncheck={<FormattedMessage id="common.province" />}
          labelCheck={<FormattedMessage id="common.commune" />}
        />
        <IconButton onClick={handlePrint} color="primary">
          <PrintIcon />
        </IconButton>
      </Box>
      {isLoading && (
        <Skeleton
          variant="rounded"
          sx={{ minWidth: 800, minHeight: 400, mt: 5 }}
        />
      )}
      {!isLoading && (
        <>
          <PrintWrapper printRef={printRef}>
            <PrintHeader searchReportData={searchReportData} />
            <Report
              forms={filteredFormsData}
              isDetailedReport={isDetailedReport}
              isAllColumnReport={isAllColumnReport}
            />
          </PrintWrapper>
          {/* Show a print button at the bottom of the page when there is data */}
          {formsData && formsData.length > 0 && (
            <Box display="flex" justifyContent="left">
              <IconButton onClick={handlePrint} color="primary">
                <PrintIcon />
              </IconButton>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
