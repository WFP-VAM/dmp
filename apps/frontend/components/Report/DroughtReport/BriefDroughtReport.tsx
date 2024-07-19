import { Stack, useTheme } from '@mui/material';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const BriefDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {droughtReportTablesMapping.map(({ columns, columnGroup }, index) => (
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
