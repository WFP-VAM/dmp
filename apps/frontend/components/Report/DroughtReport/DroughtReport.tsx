import { DroughtDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import {
  generateDroughtBriefReport,
  generateDroughtDetailedReport,
} from 'utils/aggregate/generateDroughtReport';
import { formatDroughtFields } from 'utils/formatRawToForm';

import { BriefDroughtReport } from './BriefDroughtReport';
import { DetailedDroughtReport } from './DetailedDroughtReport';

export const DroughtReport = ({
  forms,
  isDetailedReport,
}: {
  forms: DroughtDto[];
  isDetailedReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatDroughtFields(form));

    return isDetailedReport
      ? generateDroughtDetailedReport(formattedForms)
      : generateDroughtBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  return (
    <>
      {isDetailedReport ? (
        <DetailedDroughtReport report={report} />
      ) : (
        <BriefDroughtReport report={report} />
      )}
    </>
  );
};
