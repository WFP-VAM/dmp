import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const CommuneLevelFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <ReportTablesWrapper>
      {floodReportTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <CommuneLevelReportTable
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
    </ReportTablesWrapper>
  );
};
