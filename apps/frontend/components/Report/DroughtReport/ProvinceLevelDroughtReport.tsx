import { Stack, useTheme } from '@mui/material';

import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const ProvinceLevelDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {droughtReportTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <ProvinceLevelReportTable
            locationParams={{
              columns,
              columnGroup,
              groupParams,
            }}
            key={index}
            disasterTableParams={{
              data: report,
              variant: 'open',
            }}
          />
        ),
      )}
    </Stack>
  );
};
