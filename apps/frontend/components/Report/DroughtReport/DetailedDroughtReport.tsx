import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const DetailedDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {droughtReportTablesMapping.map((tableSetting, index) => (
        <DetailedReportTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
