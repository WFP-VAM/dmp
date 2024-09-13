import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import { incidentTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';
import ReportTablesWrapper from 'components/ReportTablesWrapper';

export const ProvinceLevelIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <ReportTablesWrapper>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => (
          <ProvinceLevelReportTable
            locationParams={{
              columns,
              columnGroup,
              groupParams,
            }}
            disasterTableParams={{
              data: report,
              variant: 'open',
              isFirstTable: index === 0,
            }}
            key={index}
          />
        ),
      )}
    </ReportTablesWrapper>
  );
};
