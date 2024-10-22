import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const ProvinceLevelFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <ReportTablesWrapper>
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
              isFirstTable: index === 0,
            }}
          />
        ),
      )}
    </ReportTablesWrapper>
  );
};
