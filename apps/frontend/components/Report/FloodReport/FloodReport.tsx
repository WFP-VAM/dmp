import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { generateFloodDetailedReport } from 'utils/aggregate/flood/generateFloodDetailedReport';
import { formatFloodFields } from 'utils/formatRawToForm';

export const FloodReport = ({ forms }: { forms: FloodDto[] }) => {
  const detailedReport = useMemo(
    () =>
      generateFloodDetailedReport(forms.map(form => formatFloodFields(form))),
    [forms],
  );

  return (
    <>
      <div>{JSON.stringify(detailedReport)}</div>
    </>
  );
};
