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
        ({ columns, columnGroup, hideTopRightBorder }, index) => (
          <ProvinceLevelReportTable
            columns={columns}
            columnGroup={columnGroup(false)}
            data={report}
            key={index}
            border={false}
            hideTopRightBorder={hideTopRightBorder}
          />
        ),
      )}
    </Stack>
  );
};