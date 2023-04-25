import { DroughtDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { generateDroughtDetailedReport } from 'utils/aggregate/generateDroughtReport';
import { formatDroughtFields } from 'utils/formatRawToForm';

export const DroughtReport = ({ forms }: { forms: DroughtDto[] }) => {
  const detailedReport = useMemo(
    () =>
      generateDroughtDetailedReport(
        forms.map(form => formatDroughtFields(form)),
      ),
    [forms],
  );

  return (
    <>
      <div>{JSON.stringify(detailedReport)}</div>
    </>
  );
};
