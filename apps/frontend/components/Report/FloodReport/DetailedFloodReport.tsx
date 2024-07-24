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
      {floodReportTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <DetailedReportTable
            locationParams={{
              columns: typeof columns === 'function' ? columns(true) : columns,
              columnGroup,
              groupParams,
            }}
            disasterTableParams={{
              data: report,
              variant: 'open',
            }}
            key={index}
          />
        ),
      )}
    </Stack>
  );
};
