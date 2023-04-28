import { BriefReportDisasterTable } from 'components/DisasterTable/BriefReportDisasterTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const BriefDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {droughtReportTablesMapping.map((tableSetting, index) => (
        <BriefReportDisasterTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
