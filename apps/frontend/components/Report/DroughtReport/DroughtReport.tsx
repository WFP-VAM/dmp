import { DroughtDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import {
  generateDroughtBriefReport,
  generateDroughtDetailedReport,
} from 'utils/aggregate/generateDroughtReport';
import { formatDroughtFields } from 'utils/formatRawToForm';

import { BriefDroughtReport } from './BriefDroughtReport';
import { DetailedDroughtReport } from './DetailedDroughtReport';
import { SummaryDroughtReportColumnSettings } from './tablesConfig/SummaryReport';

export const DroughtReport = ({
  forms,
  isDetailedReport,
  isAllColumnReport,
}: {
  forms: DroughtDto[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatDroughtFields(form));

    return isDetailedReport
      ? generateDroughtDetailedReport(formattedForms)
      : generateDroughtBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  if (isAllColumnReport) {
    return (
      <>
        {isDetailedReport ? (
          <DetailedDroughtReport report={report} />
        ) : (
          <BriefDroughtReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isDetailedReport ? (
        <DetailedReportTable
          locationParams={{
            columns: SummaryDroughtReportColumnSettings.columns,
            columnGroup: SummaryDroughtReportColumnSettings.columnGroup,
          }}
          disasterTableParams={{
            data: report,
            variant: 'bordered',
          }}
        />
      ) : (
        <BriefReportTable
          locationParams={{
            columns: SummaryDroughtReportColumnSettings.columns,
            columnGroup: SummaryDroughtReportColumnSettings.columnGroup,
          }}
          disasterTableParams={{
            data: report,
            variant: 'bordered',
          }}
        />
      )}
    </>
  );
};
