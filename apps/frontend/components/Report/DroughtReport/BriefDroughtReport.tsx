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
      {droughtReportTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <BriefReportTable
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
