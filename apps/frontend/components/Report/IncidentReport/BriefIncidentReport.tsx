import { Stack, useTheme } from '@mui/material';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const BriefIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidenTablesMapping.map(({ columns, columnGroup }, index) => (
        <BriefReportTable
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
