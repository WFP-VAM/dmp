import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import {
  generateFloodBriefReport,
  generateFloodDetailedReport,
} from 'utils/aggregate/generateFloodReport';
import { formatFloodFields } from 'utils/formatRawToForm';

import { BriefFloodReport } from './BriefFloodReport';
import { DetailedFloodReport } from './DetailedFloodReport';
import { SummaryFloodReportColumnSettings } from './tablesConfig/SummaryReport';

export const FloodReport = ({
  forms,
  isDetailedReport,
  isAllColumnReport,
}: {
  forms: FloodDto[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatFloodFields(form));

    return isDetailedReport
      ? generateFloodDetailedReport(formattedForms)
      : generateFloodBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  if (isAllColumnReport) {
    return (
      <>
        {isDetailedReport ? (
          <DetailedFloodReport report={report} />
        ) : (
          <BriefFloodReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isDetailedReport ? (
        <DetailedReportTable
          columns={SummaryFloodReportColumnSettings.columns}
          columnGroup={SummaryFloodReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={true}
        />
      ) : (
        <BriefReportTable
          columns={SummaryFloodReportColumnSettings.columns}
          columnGroup={SummaryFloodReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={true}
        />
      )}
    </>
  );
};
