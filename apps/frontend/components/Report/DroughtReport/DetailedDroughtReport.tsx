import { DetailedReportDisasterTable } from 'components/DisasterTable/DetailedReportDisasterTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const DetailedDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {droughtReportTablesMapping.map((tableSetting, index) => (
        <DetailedReportDisasterTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
