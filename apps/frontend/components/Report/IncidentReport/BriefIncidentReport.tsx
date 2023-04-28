import { BriefReportDisasterTable } from 'components/DisasterTable/BriefReportDisasterTable';
import { incidenTablesMapping } from 'components/FormValidation/IncidentFormValidation/incidentTablesMapping';

export const BriefIncidentReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      {incidenTablesMapping.map((tableSetting, index) => (
        <BriefReportDisasterTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={report}
          key={index}
        />
      ))}
    </>
  );
};
