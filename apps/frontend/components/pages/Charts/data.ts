import { DisasterMapping } from '@wfp-dmp/interfaces';
import { ChartData } from 'chart.js';
import { IntlShape } from 'react-intl';

type GroupByLevel = 'province' | 'district' | 'commune';

export interface FormattedForm {
  province: string;
  district: string;
  commune: string;
  disTyp: string;
  NumPeoAff: string;
  floodN: string;
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
    acc[location] ??= {
      flood: new Set(), // Use a set  to track distinct flood events
      floodPeoAff: 0,
      drought: 0,
      droughtPeoAff: 0,
      incident: 0,
      incidentPeoAff: 0,
    };
    if (form.disTyp === DisasterMapping['flood']) {
      acc[location].flood.add(form.floodN);
      acc[location].floodPeoAff += +form.NumPeoAff;
    } else if (form.disTyp === DisasterMapping['drought']) {
      acc[location].drought++;
      acc[location].droughtPeoAff += +form.NumPeoAff;
    } else {
      acc[location].incident++;
      acc[location].incidentPeoAff += +form.NumPeoAff;
    }

    return acc;
  }, {} as Record<string, { flood: Set<string>; floodPeoAff: number; drought: number; droughtPeoAff: number; incident: number; incidentPeoAff: number }>);

  // Sort the groupedData alphabetically by location name
  const sortedData = Object.entries(groupedData).sort((a, b) => {
    const locationA = intl.formatMessage({
      id: `${groupByLevel}.${a[0]}`,
      defaultMessage: a[0],
    });
    const locationB = intl.formatMessage({
      id: `${groupByLevel}.${b[0]}`,
      defaultMessage: b[0],
    });

    return locationA.localeCompare(locationB);
  });

  const labels = sortedData.map(([location]) =>
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
          data: sortedData.map(([, d]) => d.flood.size), // Use Set size for flood count
          backgroundColor: '#05476B',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.DROUGHT',
            defaultMessage: 'Drought',
          }),
          data: sortedData.map(([, d]) => d.drought),
          backgroundColor: '#63B2BD',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.INCIDENT',
            defaultMessage: 'Incident',
          }),
          data: sortedData.map(([, d]) => d.incident),
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
          data: sortedData.map(([, d]) => d.floodPeoAff),
          backgroundColor: '#05476B',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.DROUGHT',
            defaultMessage: 'Drought',
          }),
          data: sortedData.map(([, d]) => d.droughtPeoAff),
          backgroundColor: '#63B2BD',
          ...commonDatasetProperties,
        },
        {
          label: intl.formatMessage({
            id: 'disasters.INCIDENT',
            defaultMessage: 'Incident',
          }),
          data: sortedData.map(([, d]) => d.incidentPeoAff),
          backgroundColor: '#D0EBF9',
          ...commonDatasetProperties,
        },
      ],
    },
  };
};
