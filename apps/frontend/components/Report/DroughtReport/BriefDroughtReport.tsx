import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';

import { droughtReportTablesMapping } from './droughtReportTablesMapping';

export const BriefDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {droughtReportTablesMapping.map((tableSetting, index) => (
        <BriefReportTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
