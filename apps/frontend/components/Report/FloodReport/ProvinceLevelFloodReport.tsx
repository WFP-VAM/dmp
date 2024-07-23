import { Stack, useTheme } from '@mui/material';

import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const ProvinceLevelFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {floodReportTablesMapping.map(
        (
          { columns, columnGroup, columnHeaderHeight, hideTopRightBorder },
          index,
        ) => (
          <ProvinceLevelReportTable
            columns={typeof columns === 'function' ? columns(false) : columns}
            columnGroup={columnGroup(false)}
            data={report}
            key={index}
            border={false}
            columnHeaderHeight={columnHeaderHeight}
            hideTopRightBorder={hideTopRightBorder}
          />
        ),
      )}
    </Stack>
  );
};
