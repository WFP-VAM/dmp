import { DetailedReportDisasterTable } from 'components/DisasterTable/DetailedReportDisasterTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <>
      {floodReportTablesMapping.map((tableSetting, index) => (
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
