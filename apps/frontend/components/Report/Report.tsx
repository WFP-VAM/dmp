import { Box, Typography } from '@mui/material';
import {
  DroughtDto,
  FloodDto,
  IncidentDto,
  isDroughtArray,
  isFloodArray,
} from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

import { DroughtReport } from './DroughtReport/DroughtReport';
import { FloodReport } from './FloodReport/FloodReport';
import { IncidentReport } from './IncidentReport/IncidentReport';

export const Report = ({
  forms,
  isDetailedReport,
  isAllColumnReport,
}: {
  forms: FloodDto[] | DroughtDto[] | IncidentDto[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
  if (forms.length === 0)
    return (
      <Box display="flex" justifyContent="center">
        <Typography color="orange">
          <FormattedMessage id="report_page.noData" />
        </Typography>
      </Box>
    );

  if (isFloodArray(forms))
    return (
      <FloodReport
        forms={forms}
        isDetailedReport={isDetailedReport}
        isAllColumnReport={isAllColumnReport}
      />
    );

  if (isDroughtArray(forms))
    return (
      <DroughtReport
        forms={forms}
        isDetailedReport={isDetailedReport}
        isAllColumnReport={isAllColumnReport}
      />
    );

  return (
    <IncidentReport
      forms={forms}
      isDetailedReport={isDetailedReport}
      isAllColumnReport={isAllColumnReport}
    />
  );
};
