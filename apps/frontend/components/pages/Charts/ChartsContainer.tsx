import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Skeleton, Stack, useTheme } from '@mui/material';
import {
  DisasterMapping,
  DroughtDto,
  FloodDto,
  IncidentDto,
  IncidentMapping,
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

const useFormattedForms = (searchReportData: SearchFormData) => {
  const { data: floodData, isLoading: isFloodLoading } = useGetForms({
    ...searchReportData,
    disTyps: [DisasterMapping['flood']],
  });
  const { data: droughtData, isLoading: isDroughtLoading } = useGetForms({
    ...searchReportData,
    disTyps: [DisasterMapping['drought']],
  });
  const { data: incidentData, isLoading: isIncidentLoading } = useGetForms({
    ...searchReportData,
    disTyps: Object.values(IncidentMapping),
  });

  const formattedForms = useMemo(() => {
    const floodForms = floodData
      ? dropNotApproved(floodData).map(form =>
          formatFloodFields(form as FloodDto),
        )
      : [];
    const droughtForms = droughtData
      ? dropNotApproved(droughtData).map(form =>
          formatDroughtFields(form as DroughtDto),
        )
      : [];
    const incidentForms = incidentData
      ? dropNotApproved(incidentData).map(form =>
          formatIncidentFields(form as IncidentDto),
        )
      : [];

    return [...floodForms, ...droughtForms, ...incidentForms];
  }, [floodData, droughtData, incidentData]);

  const isLoading = isFloodLoading || isDroughtLoading || isIncidentLoading;

  return { formattedForms, isLoading };
};

export const ChartsContainer = () => {
  const theme = useTheme();
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );

  console.log({ defaultSearchReportData });

  const { formattedForms, isLoading } = useFormattedForms(searchReportData);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
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
          </PrintWrapper>
        </>
      )}
    </Stack>
  );
};
