import { BriefReportTable } from 'components/DisasterTable/BriefReportTable';
import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';

import { BriefIncidentReport } from './BriefIncidentReport';
import { DetailedIncidentReport } from './DetailedIncidentReport';
import { SummaryIncidentReportColumnSettings } from './SummaryReport';

export const IncidentSpecificReport = ({
  report,
  isDetailedReport,
  isAllColumnReport,
}: {
  report: Record<string, string | number | undefined>[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
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
