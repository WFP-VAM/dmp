import { Stack, useTheme } from '@mui/material';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const BriefFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {floodReportTablesMapping.map((tableSetting, index) => (
        <BriefReportTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
          border={false}
          columnHeaderHeight={tableSetting.columnHeaderHeight}
        />
      ))}
    </Stack>
  );
};
