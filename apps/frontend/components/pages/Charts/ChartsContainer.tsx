import PrintIcon from '@mui/icons-material/Print';
import {
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DisasterMapping,
  DroughtDto,
  FloodDto,
  IncidentDto,
  IncidentMapping,
} from '@wfp-dmp/interfaces';
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
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
  filterFloodReports,
  formatDroughtFields,
  formatFloodFields,
  formatIncidentFields,
} from 'utils/formatRawToForm';

import { formatChartData, FormattedForm } from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const defaultSearchReportData: SearchFormData = {
  disTyps: [],
  region: { province: [], district: [], commune: [] },
  dateRange: { startDate: dayjs().subtract(1, 'month'), endDate: dayjs() },
};

const chartOptions = {
  responsive: true,
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, grid: { display: true } },
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
    const floodForms = filterFloodReports(
      floodData
        ? dropNotApproved(floodData).map(form =>
            formatFloodFields(form as FloodDto),
          )
        : [],
    );
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
  const intl = useIntl();
  const [searchReportData, setSearchReportData] = useState(
    defaultSearchReportData,
  );
  const { formattedForms, isLoading } = useFormattedForms(searchReportData);
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const [chartData, setChartData] = useState<{
    events: ChartData<'bar'>;
    affected: ChartData<'bar'>;
  }>({ events: { datasets: [] }, affected: { datasets: [] } });

  useEffect(() => {
    const data =
      formattedForms.length > 0
        ? formatChartData(
            formattedForms as FormattedForm[],
            searchReportData,
            intl,
          )
        : { events: { datasets: [] }, affected: { datasets: [] } };
    setChartData(data);
  }, [formattedForms, searchReportData, intl]);

  return (
    <Stack flexDirection="column" gap={theme.spacing(4)} width="100%">
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={{ xs: theme.spacing(2), sm: 0 }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <SearchFilters
          initSearchFormData={searchReportData}
          setSearchFormData={setSearchReportData}
          submitButtonContent={
            <FormattedMessage id="charts_page.update" defaultMessage="update" />
          }
          hideDisasterFilter
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
          sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
        >
          <PrintIcon />
        </IconButton>
      </Stack>

      {isLoading && (
        <Skeleton
          variant="rounded"
          sx={{
            minWidth: { xs: '100%', sm: 800 },
            minHeight: { xs: 300, sm: 400 },
            mt: { xs: 2, sm: 5 },
          }}
        />
      )}
      {!isLoading && (
        <PrintWrapper printRef={printRef}>
          <PrintHeader searchReportData={searchReportData} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: theme.spacing(4),
            }}
          >
            <div style={{ width: '60%' }}>
              <Typography variant="h5" align="center" gutterBottom>
                <FormattedMessage
                  id="charts_page.events"
                  defaultMessage="Number of Events"
                />
              </Typography>
              <Bar
                data={chartData.events}
                options={chartOptions}
                width={1000}
                height={400}
              />
            </div>
            <div
              style={{
                width: '60%',
                pageBreakInside: 'avoid',
                breakInside: 'avoid',
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                <FormattedMessage
                  id="charts_page.affected"
                  defaultMessage="Number of Affected People"
                />
              </Typography>
              <Bar
                data={chartData.affected}
                options={chartOptions}
                width={1000}
                height={400}
              />
            </div>
          </div>
        </PrintWrapper>
      )}
    </Stack>
  );
};
