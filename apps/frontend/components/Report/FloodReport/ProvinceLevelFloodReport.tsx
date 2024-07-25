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
        ({ columns, columnGroup, columnHeaderHeight, groupParams }, index) => (
          <ProvinceLevelReportTable
            locationParams={{
              columns: typeof columns === 'function' ? columns(false) : columns,
              columnGroup,
              groupParams,
            }}
            key={index}
            disasterTableParams={{
              data: report,
              variant: 'open',
              columnHeaderHeight: columnHeaderHeight,
            }}
          />
        ),
      )}
    </Stack>
  );
};
