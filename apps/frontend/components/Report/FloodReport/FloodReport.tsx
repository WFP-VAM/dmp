import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import {
  generateFloodBriefReport,
  generateFloodDetailedReport,
} from 'utils/aggregate/generateFloodReport';
import { formatFloodFields } from 'utils/formatRawToForm';

import { BriefFloodReport } from './BriefFloodReport';
import { DetailedFloodReport } from './DetailedFloodReport';

export const FloodReport = ({
  forms,
  isDetailedReport,
}: {
  forms: FloodDto[];
  isDetailedReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatFloodFields(form));

    return isDetailedReport
      ? generateFloodDetailedReport(formattedForms)
      : generateFloodBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  return (
    <>
      {isDetailedReport ? (
        <DetailedFloodReport report={report} />
      ) : (
        <BriefFloodReport report={report} />
      )}
    </>
  );
};
