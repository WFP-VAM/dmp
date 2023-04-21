import { Box, Typography } from '@mui/material';
import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  isDroughtArray,
  isFloodArray,
} from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

import { FloodReport } from './FloodReport/FloodReport';
import { IncidentReport } from './IncidentReport/IncidentReport';

export const Report = ({
  forms,
}: {
  forms: FloodDto[] | DroughtDto[] | IncidentDto[];
}) => {
  if (forms.length === 0)
    return (
      <Box display="flex" justifyContent="center">
        <Typography color="orange">
          <FormattedMessage id="report_page.noData" />
        </Typography>
      </Box>
    );

  if (isFloodArray(forms)) return <FloodReport forms={forms} />;

  if (isDroughtArray(forms)) return <div>WIP DROUGHT</div>;

  return <IncidentReport forms={forms} />;
};
