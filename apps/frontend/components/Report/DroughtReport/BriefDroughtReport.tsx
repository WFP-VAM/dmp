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
      {droughtReportTablesMapping.map((tableSetting, index) => (
        <BriefReportTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
          border={false}
        />
      ))}
    </Stack>
  );
};
