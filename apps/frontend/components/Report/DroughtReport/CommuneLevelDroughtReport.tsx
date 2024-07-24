import { Stack, useTheme } from '@mui/material';

import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const CommuneLevelDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {droughtReportTablesMapping.map(({ columns, columnGroup }, index) => (
        <CommuneLevelReportTable
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