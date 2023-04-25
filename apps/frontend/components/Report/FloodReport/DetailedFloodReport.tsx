import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import {
  detailedNumAffected1ColumnGroup,
  detailedNumAffected1Columns,
} from './detailedTablesConfig/detailedNumAffected-1';

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <DisasterTable
      columns={detailedNumAffected1Columns}
      columnGroup={detailedNumAffected1ColumnGroup}
      data={report}
      isEditable={false}
      getRowId={(row: { commune: string }) => row.commune}
    />
  );
};
