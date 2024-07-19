import { Stack, useTheme } from '@mui/material';

import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {floodReportTablesMapping.map(({ columns, columnGroup }, index) => (
        <DetailedReportTable
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
