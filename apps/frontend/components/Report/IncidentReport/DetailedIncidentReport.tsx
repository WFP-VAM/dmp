import { DetailedReportTable } from 'components/DisasterTable/DetailedReportTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const DetailedIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {incidenTablesMapping.map((tableSetting, index) => (
        <DetailedReportTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
