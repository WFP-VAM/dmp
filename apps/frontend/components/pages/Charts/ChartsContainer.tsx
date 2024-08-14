import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Skeleton, Stack, useTheme } from '@mui/material';
import {
  DisasterMapping,
  DroughtDto,
  FloodDto,
  IncidentDto,
} from '@wfp-dmp/interfaces';
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
import { useGetForms } from 'services/api/kobo/useGetForms';
import { colors } from 'theme/muiTheme';
import { dropNotApproved } from 'utils/dropNotApproved';
import {
  formatDroughtFields,
  formatFloodFields,
  formatIncidentFields,
} from 'utils/formatRawToForm';

const defaultSearchReportData: SearchFormData = {
  disTyps: [DisasterMapping['drought'], DisasterMapping['flood']],
  region: {
    province: [],
    district: [],
    commune: [],
  },
  dateRange: {
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs(),
  },
};

export const ChartsContainer = () => {
  const theme = useTheme();
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  console.log({ defaultSearchReportData });

  const { data: formsData, isLoading } = useGetForms(searchReportData);

  const filteredFormsData = useMemo(() => {
    return formsData !== undefined ? dropNotApproved(formsData) : [];
  }, [formsData]);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const formattedForms = useMemo(() => {
    if (searchReportData.disTyps.includes(DisasterMapping['flood'])) {
      return (filteredFormsData as FloodDto[]).map(form =>
        formatFloodFields(form),
      );
    } else if (searchReportData.disTyps.includes(DisasterMapping['drought'])) {
      return (filteredFormsData as DroughtDto[]).map(form =>
        formatDroughtFields(form),
      );
    } else if (searchReportData.disTyps.includes(DisasterMapping['incident'])) {
      return (filteredFormsData as IncidentDto[]).map(form =>
        formatIncidentFields(form),
      );
    }

    return [];
  }, [filteredFormsData, searchReportData.disTyps]);

  return (
    <Stack flexDirection="column" gap={theme.spacing(4)} width="100%">
      <Stack justifyContent="space-between" direction="row">
        <SearchFilters
          initSearchFormData={searchReportData}
          setSearchFormData={setSearchReportData}
          submitButtonContent={
            <FormattedMessage
              id="report_page.showReport"
              defaultMessage="Show Charts"
            />
          }
        />
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
            {/* Count by disTyp */}
            <pre>
              {JSON.stringify(
                formattedForms.reduce((acc, form) => {
                  acc[form.disTyp] = (acc[form.disTyp] || 0) + 1;

                  return acc;
                }, {} as Record<string, number>),
                null,
                2,
              )}
            </pre>
            <pre>{JSON.stringify(formattedForms, null, 2)}</pre>
          </PrintWrapper>
        </>
      )}
    </Stack>
  );
};
