import { IncidentDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import {
  generateIncidentBriefReport,
  generateIncidentDetailedReport,
} from 'utils/aggregate/generateIncidentReport';
import { formatIncidentFields } from 'utils/formatRawToForm';

import { BriefIncidentReport } from './BriefIncidentReport';
import { DetailedIncidentReport } from './DetailedIncidentReport';
import { SummaryIncidentReportColumnSettings } from './SummaryReport';

export const IncidentReport = ({
  forms,
  isDetailedReport,
  isAllColumnReport,
}: {
  forms: IncidentDto[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatIncidentFields(form));

    return isDetailedReport
      ? generateIncidentDetailedReport(formattedForms)
      : generateIncidentBriefReport(formattedForms);
  }, [forms, isDetailedReport]);

  if (isAllColumnReport) {
    return (
      <>
        {isDetailedReport ? (
          <DetailedIncidentReport report={report} />
        ) : (
          <BriefIncidentReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isDetailedReport ? (
        <DetailedReportTable
          columns={SummaryIncidentReportColumnSettings.columns}
          columnGroup={SummaryIncidentReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={true}
        />
      ) : (
        <BriefReportTable
          columns={SummaryIncidentReportColumnSettings.columns}
          columnGroup={SummaryIncidentReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={true}
        />
      )}
    </>
  );
};
