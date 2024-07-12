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
      {searchReportData.region.province.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.province" />
          {' : '}
          {/* TODO: How should we display things here? */}
          <FormattedMessage
            id={`province.${searchReportData.region.province[0]}`}
          />
        </Typography>
      ) : null}
      {searchReportData.region.district.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.district" />
          {' : '}
          <FormattedMessage
            id={`district.${searchReportData.region.district[0]}`}
          />
        </Typography>
      ) : null}

      {searchReportData.region.commune.length !== 0 ? (
        <Typography ml={3}>
          <FormattedMessage id="validation_search_params.commune" />
          {' : '}
          <FormattedMessage
            id={`commune.${searchReportData.region.commune[0]}`}
          />
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
