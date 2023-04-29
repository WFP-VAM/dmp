import { BriefReportDisasterTable } from 'components/DisasterTable/BriefReportDisasterTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const BriefFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {floodReportTablesMapping.map((tableSetting, index) => (
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
