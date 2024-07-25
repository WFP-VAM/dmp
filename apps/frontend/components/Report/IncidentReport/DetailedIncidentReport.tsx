import { Stack, useTheme } from '@mui/material';

import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const DetailedIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <DetailedReportTable
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
