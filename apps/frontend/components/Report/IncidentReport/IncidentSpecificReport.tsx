import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';

import { CommuneLevelIncidentReport } from './CommuneLevelIncidentReport';
import { ProvinceLevelIncidentReport } from './ProvinceLevelIncidentReport';
import { SummaryIncidentReportColumnSettings } from './SummaryReport';

export const IncidentSpecificReport = ({
  report,
  isCommuneLevelReport,
  isAllColumnReport,
}: {
  report: Record<string, string | number | undefined>[];
  isCommuneLevelReport: boolean;
  isAllColumnReport: boolean;
}) => {
  if (isAllColumnReport) {
    return (
      <>
        {isCommuneLevelReport ? (
          <CommuneLevelIncidentReport report={report} />
        ) : (
          <ProvinceLevelIncidentReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isCommuneLevelReport ? (
        <CommuneLevelReportTable
          locationParams={{
            columns: SummaryIncidentReportColumnSettings.columns,
            columnGroup: SummaryIncidentReportColumnSettings.columnGroup,
          }}
          disasterTableParams={{
            data: report,
            variant: 'bordered',
          }}
        />
      ) : (
        <ProvinceLevelReportTable
          locationParams={{
            columns: SummaryIncidentReportColumnSettings.columns,
            columnGroup: SummaryIncidentReportColumnSettings.columnGroup,
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
