import { Stack, useTheme } from '@mui/material';

import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const ProvinceLevelIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <ProvinceLevelReportTable
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
