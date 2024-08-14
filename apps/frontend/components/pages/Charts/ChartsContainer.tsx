import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Skeleton, Stack, useTheme } from '@mui/material';
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
  formatDroughtFields,
  formatFloodFields,
  formatIncidentFields,
} from 'utils/formatRawToForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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

  const intl = useIntl();
  const chartRef = useRef<Chart | null>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  useEffect(() => {
    if (formattedForms.length > 0) {
      const groupedData = formattedForms.reduce((acc, form) => {
        const province = form.province;
        if (!acc[province]) {
          acc[province] = { flood: 0, drought: 0, incident: 0 };
        }
        if (form.disTyp === DisasterMapping['flood']) {
          acc[province].flood++;
        } else if (form.disTyp === DisasterMapping['drought']) {
          acc[province].drought++;
        } else {
          acc[province].incident++;
        }

        return acc;
      }, {} as Record<string, { flood: number; drought: number; incident: number }>);

      const labels = Object.keys(groupedData).map(province =>
        intl.formatMessage({
          id: `province.${province}`,
          defaultMessage: province,
        }),
      );

      const data: ChartData<'bar'> = {
        labels,
        datasets: [
          {
            label: intl.formatMessage({
              id: 'disasters.FLOOD',
              defaultMessage: 'Lalla',
            }),
            data: Object.values(groupedData).map(d => d.flood),
            backgroundColor: '#05476B',
            borderColor: '#000000',
            borderWidth: 1,
          },
          {
            label: intl.formatMessage({
              id: 'disasters.DROUGHT',
              defaultMessage: 'Drought',
            }),
            data: Object.values(groupedData).map(d => d.drought),
            backgroundColor: '#63B2BD',
            borderColor: '#000000',
            borderWidth: 1,
          },
          {
            label: intl.formatMessage({
              id: 'disasters.INCIDENT',
              defaultMessage: 'Incident',
            }),
            data: Object.values(groupedData).map(d => d.incident),
            backgroundColor: '#D0EBF9',
            borderColor: '#000000',
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    }
  }, [formattedForms, intl]);

  const options = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

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
        <PrintWrapper printRef={printRef}>
          <PrintHeader searchReportData={searchReportData} />
          <div
            style={{
              width: '100%',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Bar data={chartData} options={options} width={1000} height={400} />
          </div>
        </PrintWrapper>
      )}
    </Stack>
  );
};
