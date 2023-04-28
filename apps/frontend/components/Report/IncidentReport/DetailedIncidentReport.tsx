import { DetailedReportDisasterTable } from 'components/DisasterTable/DetailedReportDisasterTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const DetailedIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {incidenTablesMapping.map((tableSetting, index) => (
        <DetailedReportDisasterTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
