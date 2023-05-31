import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const BriefFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {floodReportTablesMapping.map((tableSetting, index) => (
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
