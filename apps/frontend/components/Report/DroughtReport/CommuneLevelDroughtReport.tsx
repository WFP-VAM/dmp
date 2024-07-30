import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const CommuneLevelDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <ReportTablesWrapper>
      {droughtReportTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <CommuneLevelReportTable
            locationParams={{
              columns,
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
    </ReportTablesWrapper>
  );
};
