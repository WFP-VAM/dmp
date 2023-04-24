import { IncidentDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { generateIncidentDetailedReport } from 'utils/aggregate/incident/generateIncidentDetailedReport';
import { formatIncidentFields } from 'utils/formatRawToForm';

export const IncidentReport = ({ forms }: { forms: IncidentDto[] }) => {
  const detailedReport = useMemo(
    () =>
      generateIncidentDetailedReport(
        forms.map(form => formatIncidentFields(form)),
      ),
    [forms],
  );

  return (
    <>
      <div>{JSON.stringify(detailedReport)}</div>
    </>
  );
};
