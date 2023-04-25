import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import {
  detailedNumAffected1Columns,
  reportNumAffected1ColumnGroup,
} from './tablesConfig/NumAffected-1';

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <DisasterTable
      columns={detailedNumAffected1Columns}
      columnGroup={reportNumAffected1ColumnGroup}
      data={report}
      isEditable={false}
      getRowId={(row: { commune: string }) => row.commune}
    />
  );
};
