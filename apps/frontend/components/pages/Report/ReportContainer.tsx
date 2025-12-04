import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Skeleton, Stack, useTheme } from '@mui/material';
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
import { PrintFooter } from 'components/PrintFooter';
import { PrintHeader } from 'components/PrintHeader';
import { PrintWrapper } from 'components/PrintWrapper';
import { Report } from 'components/Report/Report';
import { useGetForms } from 'services/api/kobo/useGetForms';
import { colors } from 'theme/muiTheme';
import { dropNotApproved } from 'utils/dropNotApproved';

const defaultSearchReportData: SearchFormData = {
  disTyps: [DisasterMapping['flood']],
  region: {
    province: [],
    district: [],
    commune: [],
  },
  dateRange: {
    startDate: dayjs().subtract(1, 'years'),
    endDate: dayjs(),
  },
};

export const ReportContainer = () => {
  const theme = useTheme();
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  const [isCommuneLevelReport, setIsCommuneLevelReport] = useState(false);
  const [isAllColumnReport, setIsAllColumnReport] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const { data: formsData, isLoading } = useGetForms(searchReportData);

  const filteredFormsData = useMemo(() => {
    return formsData !== undefined ? dropNotApproved(formsData) : [];
  }, [formsData]);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      setIsPrinting(true);

      return new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      });
    },
    onAfterPrint: () => setIsPrinting(false),
  });

  return (
    <Stack flexDirection="column" gap={theme.spacing(4)} width="100%">
      <Stack justifyContent="space-between" direction="row">
        <SearchFilters
          initSearchFormData={searchReportData}
          setSearchFormData={setSearchReportData}
          submitButtonContent={
            <FormattedMessage
              id="report_page.showReport"
              defaultMessage="Show Report"
            />
          }
          extraFilters={
            <>
              <LabelSwitch
                label="report_page.data"
                value={isAllColumnReport}
                onChange={(event, checked) => {
                  setIsAllColumnReport(checked);
                }}
                labelUncheck="report_page.summary"
                labelCheck="report_page.all_columns"
              />
              <LabelSwitch
                label="report_page.level"
                value={isCommuneLevelReport}
                onChange={(event, checked) => {
                  setIsCommuneLevelReport(checked);
                }}
                labelUncheck="common.province"
                labelCheck="common.commune"
              />
            </>
          }
        />
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handlePrint}
            style={{
              border: `1px solid ${colors.color3}`,
              borderRadius: '4px',
              aspectRatio: 1,
              height: '2.5rem',
              color: colors.color3,
            }}
          >
            <PrintIcon />
          </IconButton>
        </Stack>
      </Stack>

      {isLoading && (
        <Skeleton
          variant="rounded"
          sx={{ minWidth: 800, minHeight: 400, mt: 5 }}
        />
      )}
      {!isLoading && (
        <PrintWrapper
          printRef={printRef}
          isPrinting={isPrinting}
        >
          <PrintHeader searchReportData={searchReportData} />
          <Report
            forms={filteredFormsData}
            isCommuneLevelReport={isCommuneLevelReport}
            isAllColumnReport={isAllColumnReport}
          />
          <PrintFooter />
        </PrintWrapper>
      )}
    </Stack>
  );
};
