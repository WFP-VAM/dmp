import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import { generateFloodDetailedReport } from 'utils/aggregate/flood/generateFloodDetailedReport';
import { formatFloodFields } from 'utils/formatRawToForm';

import {
  detailedNumAffected1ColumnGroup,
  detailedNumAffected1Columns,
} from './detailedTablesConfig/detailedNumAffected-1';

export const FloodReport = ({ forms }: { forms: FloodDto[] }) => {
  const detailedReport = useMemo(
    () =>
      generateFloodDetailedReport(forms.map(form => formatFloodFields(form))),
    [forms],
  );

  return (
    <>
      <DisasterTable
        columns={detailedNumAffected1Columns}
        columnGroup={detailedNumAffected1ColumnGroup}
        data={detailedReport}
        isEditable={false}
        getRowId={(row: { commune: string }) => row.commune}
      />
    </>
  );
};
