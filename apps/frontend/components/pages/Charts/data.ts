import { DisasterMapping } from '@wfp-dmp/interfaces';
import { ChartData } from 'chart.js';
import { IntlShape } from 'react-intl';

type GroupByLevel = 'province' | 'district' | 'commune';

export interface FormattedForm {
  province: string;
  district: string;
  commune: string;
  disTyp: string;
}

interface SearchReportData {
  region: {
    province: string[];
    district: string[];
    commune: string[];
  };
}

export const formatChartData = (
  formattedForms: FormattedForm[],
  searchReportData: SearchReportData,
  intl: IntlShape,
): ChartData<'bar'> => {
  let groupByLevel: GroupByLevel = 'province';
  if (
    searchReportData.region.commune.length > 0 ||
    searchReportData.region.district.length === 1
  ) {
    groupByLevel = 'commune';
  } else if (
    searchReportData.region.district.length > 0 ||
    searchReportData.region.province.length === 1
  ) {
    groupByLevel = 'district';
  }

  const groupedData = formattedForms.reduce((acc, form) => {
    const location = form[groupByLevel];
    acc[location] ??= { flood: 0, drought: 0, incident: 0 };
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

  return {
    labels,
    datasets: [
      {
        label: intl.formatMessage({
          id: 'disasters.FLOOD',
          defaultMessage: 'Flood',
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
};
