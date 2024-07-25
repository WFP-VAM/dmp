import { Stack, useTheme } from '@mui/material';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const BriefIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <BriefReportTable
            locationParams={{
              columns,
              columnGroup,
              groupParams,
            }}
            disasterTableParams={{
              data: report,
              variant: 'open',
            }}
            key={index}
          />
        ),
      )}
    </Stack>
  );
};
