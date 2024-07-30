import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

export const CommuneLevelIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <ReportTablesWrapper>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <CommuneLevelReportTable
            locationParams={{
              columns,
              columnGroup,
              groupParams,
            }}
            disasterTableParams={{
              data: report,
              variant: 'open',
            }}
            key={index}
          />
        ),
      )}
    </ReportTablesWrapper>
  );
};
