import { IncidentDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import {
  generateIncidentBriefReport,
  generateIncidentDetailedReport,
} from 'utils/aggregate/generateIncidentReport';
import { formatIncidentFields } from 'utils/formatRawToForm';

import { BriefIncidentReport } from './BriefIncidentReport';
import { DetailedIncidentReport } from './DetailedIncidentReport';

export const IncidentReport = ({
  forms,
  isDetailedReport,
}: {
  forms: IncidentDto[];
  isDetailedReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatIncidentFields(form));

    return isDetailedReport
      ? generateIncidentDetailedReport(formattedForms)
      : generateIncidentBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  return (
    <>
      {isDetailedReport ? (
        <DetailedIncidentReport report={report} />
      ) : (
        <BriefIncidentReport report={report} />
      )}
    </>
  );
};
