import { Stack, useTheme } from '@mui/material';

import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const DetailedIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidenTablesMapping.map(({ columns, columnGroup }, index) => (
        <DetailedReportTable
          columns={columns}
          columnGroup={columnGroup(true)}
          data={report}
          key={index}
          border={false}
        />
      ))}
    </Stack>
  );
};
