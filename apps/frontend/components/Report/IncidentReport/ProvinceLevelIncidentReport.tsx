import { Stack, useTheme } from '@mui/material';

import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const ProvinceLevelIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidenTablesMapping.map(({ columns, columnGroup }, index) => (
        <ProvinceLevelReportTable
          columns={columns}
          columnGroup={columnGroup(false)}
          data={report}
          key={index}
          border={false}
        />
      ))}
    </Stack>
  );
};
