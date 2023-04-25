import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import {
  briefNumAffected1Columns,
  reportNumAffected1ColumnGroup,
} from './tablesConfig/NumAffected-1';

export const BriefFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <DisasterTable
      columns={briefNumAffected1Columns}
      columnGroup={reportNumAffected1ColumnGroup}
      data={report}
      isEditable={false}
      getRowId={(row: { province: string }) => row.province}
    />
  );
};
