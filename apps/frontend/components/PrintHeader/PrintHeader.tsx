import { Box, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { SearchFormData } from 'components/Filters/SearchFilters';

interface IProps {
  searchReportData: SearchFormData;
}

export const PrintHeader = ({ searchReportData }: IProps): JSX.Element => {
  const intl = useIntl();

  return (
    <Box
      sx={{
        '@media print': {
          display: 'flex',
        },
        '@media screen': {
          display: 'none',
        },
      }}
    >
      <Typography>
        <FormattedMessage id="validation_search_params.disaster_type" />
        {' : '}
        {searchReportData.disTyps.map(disTyp => (
          <span key={disTyp}>
            <FormattedMessage id={`disasters.${disTyp}`} />{' '}
          </span>
        ))}
      </Typography>
      {searchReportData.region.province.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.province" />
          {' : '}
          {searchReportData.region.province
            .map(x => intl.formatMessage({ id: `province.${x}` }))
            .join(', ')}
        </Typography>
      ) : null}
      {searchReportData.region.district.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.district" />
          {' : '}
          {searchReportData.region.district
            .map(x => intl.formatMessage({ id: `district.${x}` }))
            .join(', ')}
        </Typography>
      ) : null}
      {searchReportData.region.commune.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.commune" />
          {' : '}
          {searchReportData.region.commune
            .map(x => intl.formatMessage({ id: `commune.${x}` }))
            .join(', ')}
        </Typography>
      ) : null}
      <Typography ml={3}>
        <FormattedMessage id="validation_search_params.start_date" />
        {` : ${
          searchReportData.dateRange.startDate?.format('YYYY-MM-DD') ?? ''
        }`}
      </Typography>
      <Typography ml={3}>
        <FormattedMessage id="validation_search_params.end_date" />
        {` : ${searchReportData.dateRange.endDate?.format('YYYY-MM-DD') ?? ''}`}
      </Typography>
    </Box>
  );
};
