import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';

import { floodReportTablesMapping } from './floodReportTablesMapping';

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <>
      {floodReportTablesMapping.map((tableSetting, index) => (
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
