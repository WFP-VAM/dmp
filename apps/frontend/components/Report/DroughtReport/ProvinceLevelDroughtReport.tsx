import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const ProvinceLevelDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <ReportTablesWrapper>
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
              isFirstTable: index === 0,
            }}
          />
        ),
      )}
    </ReportTablesWrapper>
  );
};
