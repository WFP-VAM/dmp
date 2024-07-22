import { Stack, useTheme } from '@mui/material';

import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const CommuneLevelFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {floodReportTablesMapping.map(({ columns, columnGroup }, index) => (
        <CommuneLevelReportTable
          columns={typeof columns === 'function' ? columns(true) : columns}
          columnGroup={columnGroup(true)}
          data={report}
          key={index}
          border={false}
        />
      ))}
    </Stack>
  );
};
