import { Box, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { SearchFormData } from 'components/Filters/SearchFilters';

interface IProps {
  searchReportData: SearchFormData;
}

export const PrintHeader = ({ searchReportData }: IProps): JSX.Element => {
  const intl = useIntl();

  const content = [
    {
      shouldShow: searchReportData.disTyps.length > 0,
      title: 'validation_search_params.disaster_type',
      value: searchReportData.disTyps
        .map(disTyp => intl.formatMessage({ id: `disasters.${disTyp}` }))
        .join(', '),
    },
    {
      shouldShow: searchReportData.region.province.length > 0,
      title: 'validation_search_params.province',
      value: searchReportData.region.province
        .map(x => intl.formatMessage({ id: `province.${x}` }))
        .join(', '),
    },
    {
      shouldShow: searchReportData.region.district.length > 0,
      title: 'validation_search_params.district',
      value: searchReportData.region.district
        .map(x => intl.formatMessage({ id: `district.${x}` }))
        .join(', '),
    },
    {
      shouldShow: searchReportData.region.commune.length > 0,
      title: 'validation_search_params.commune',
      value: searchReportData.region.commune
        .map(x => intl.formatMessage({ id: `commune.${x}` }))
        .join(', '),
    },
    {
      shouldShow: true,
      title: 'validation_search_params.start_date',
      value: searchReportData.dateRange.startDate?.format('YYYY-MM-DD') ?? '',
    },
    {
      shouldShow: true,
      title: 'validation_search_params.end_date',
      value: searchReportData.dateRange.endDate?.format('YYYY-MM-DD') ?? '',
    },
  ];

  return (
    <Box
      sx={{
        '@media print': {
          display: 'flex',
          flexDirection: 'row',
          padding: '2rem',
          gap: '2rem',
          flexWrap: 'wrap',
        },
        '@media screen': {
          display: 'none',
        },
      }}
    >
      {content
        .filter(x => x.shouldShow)
        .map(x => (
          <Typography key={x.title}>
            <Typography component="span" variant="h1" fontWeight="bold">
              <FormattedMessage id={x.title} />
            </Typography>

            {' : '}
            {x.value}
          </Typography>
        ))}
    </Box>
  );
};
