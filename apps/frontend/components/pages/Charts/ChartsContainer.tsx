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

  const { formattedForms, isLoading } = useFormattedForms(searchReportData);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const intl = useIntl();
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  useEffect(() => {
    // TODO - group at different levels depending on the search values
    // Decide on logic for grouping
    let groupByLevel: 'province' | 'district' | 'commune' = 'province';
    if (searchReportData.region.commune.length > 1) {
      groupByLevel = 'commune';
    } else if (searchReportData.region.district.length > 1) {
      groupByLevel = 'district';
    } else if (searchReportData.region.district.length > 0) {
      groupByLevel = 'commune';
    }
    console.log({ groupByLevel });

    if (formattedForms.length > 0) {
      const groupedData = formattedForms.reduce((acc, form) => {
        const location = form[groupByLevel];
        if (!acc[location]) {
          acc[location] = { flood: 0, drought: 0, incident: 0 };
        }
        if (form.disTyp === DisasterMapping['flood']) {
          acc[location].flood++;
        } else if (form.disTyp === DisasterMapping['drought']) {
          acc[location].drought++;
        } else {
          acc[location].incident++;
        }

        return acc;
      }, {} as Record<string, { flood: number; drought: number; incident: number }>);

      const labels = Object.keys(groupedData).map(location =>
        intl.formatMessage({
          id: `${groupByLevel}.${location}`,
          defaultMessage: location,
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
    } else {
      setChartData({ datasets: [] });
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
              id="charts_page.showReport"
              defaultMessage="Charts"
            />
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
