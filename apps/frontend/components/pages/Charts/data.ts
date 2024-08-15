import { DisasterMapping } from '@wfp-dmp/interfaces';
import { ChartData } from 'chart.js';
import { IntlShape } from 'react-intl';

type GroupByLevel = 'province' | 'district' | 'commune';

export interface FormattedForm {
  province: string;
  district: string;
  commune: string;
  disTyp: string;
  NumPeoAff: number;
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
): { events: ChartData<'bar'>; affected: ChartData<'bar'> } => {
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
    console.log(form[groupByLevel], form.disTyp, form.NumPeoAff);
    acc[location] ??= {
      flood: 0,
      floodPeoAff: 0,
      drought: 0,
      droughtPeoAff: 0,
      incident: 0,
      incidentPeoAff: 0,
    };
    if (form.disTyp === DisasterMapping['flood']) {
      acc[location].flood++;
      acc[location].floodPeoAff += +form.NumPeoAff;
    } else if (form.disTyp === DisasterMapping['drought']) {
      acc[location].drought++;
      acc[location].droughtPeoAff += +form.NumPeoAff;
    } else {
      acc[location].incident++;
      acc[location].incidentPeoAff += +form.NumPeoAff;
    }

    return acc;
  }, {} as Record<string, { flood: number; floodPeoAff: number; drought: number; droughtPeoAff: number; incident: number; incidentPeoAff: number }>);

  const labels = Object.keys(groupedData).map(location =>
    intl.formatMessage({
      id: `${groupByLevel}.${location}`,
      defaultMessage: location,
    }),
  );

  const commonDatasetProperties = {
    borderColor: '#000000',
    borderWidth: 1,
  };

  return {
    events: {
      labels,
      datasets: [
        {
          label: intl.formatMessage({
            id: 'disasters.FLOOD',
            defaultMessage: 'Flood',
          }),
          data: Object.values(groupedData).map(d => d.flood),
          backgroundColor: '#05476B',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.DROUGHT',
            defaultMessage: 'Drought',
          }),
          data: Object.values(groupedData).map(d => d.drought),
          backgroundColor: '#63B2BD',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.INCIDENT',
            defaultMessage: 'Incident',
          }),
          data: Object.values(groupedData).map(d => d.incident),
          backgroundColor: '#D0EBF9',
          ...commonDatasetProperties,
        },
      ],
    },
    affected: {
      labels,
      datasets: [
        {
          label: intl.formatMessage({
            id: 'disasters.FLOOD',
            defaultMessage: 'Flood',
          }),
          data: Object.values(groupedData).map(d => d.floodPeoAff),
          backgroundColor: '#05476B',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.DROUGHT',
            defaultMessage: 'Drought',
          }),
          data: Object.values(groupedData).map(d => d.droughtPeoAff),
          backgroundColor: '#63B2BD',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.INCIDENT',
            defaultMessage: 'Incident',
          }),
          data: Object.values(groupedData).map(d => d.incidentPeoAff),
          backgroundColor: '#D0EBF9',
          ...commonDatasetProperties,
        },
      ],
    },
  };
};
