import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { SearchFormData } from 'components/Filters/SearchFilters';

interface IProps {
  searchReportData: SearchFormData;
}

export const PrintHeader = ({ searchReportData }: IProps): JSX.Element => {
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
          <>
            <FormattedMessage key={disTyp} id={`disasters.${disTyp}`} />{' '}
          </>
        ))}
      </Typography>
      {searchReportData.region.province !== '' ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.province" />
          {' : '}
          <FormattedMessage
            id={`province.${searchReportData.region.province}`}
          />
        </Typography>
      ) : null}
      {searchReportData.region.district !== '' ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.district" />
          {' : '}
          <FormattedMessage
            id={`district.${searchReportData.region.district}`}
          />
        </Typography>
      ) : null}

      {searchReportData.region.commune !== '' ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.commune" />
          {' : '}
          <FormattedMessage id={`commune.${searchReportData.region.commune}`} />
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
