import { BriefReportDisasterTable } from 'components/DisasterTable/BriefReportDisasterTable';
import {
  AgricultureColumnGroup,
  AgricultureColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/Agriculture';
import {
  EducationNeedsColumnGroup,
  EducationNeedsColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/EducationNeeds';
import {
  HealthNeedsColumnGroup,
  HealthNeedsColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/HealthNeeds';
import {
  HouseSocialColumnGroup,
  HouseSocialColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/HouseSocial';
import {
  InfrastructureColumnGroup,
  InfrastructureColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/Infrastructure';
import {
  IrrigationColumnGroup,
  IrrigationColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/Irrigation';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-1';
import {
  NumAffected2ColumnGroup,
  NumAffected2Columns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-2';
import {
  ShelterNeedsColumnGroup,
  ShelterNeedsColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/ShelterNeeds';
import {
  WaterNeedsColumnGroup,
  WaterNeedsColumns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/WaterNeeds';

import {
  ReportFoodNeedsColumnGroup,
  ReportFoodNeedsColumns,
} from './tablesConfig/ReportFoodNeeds';
import {
  ReportThreatColumnGroup,
  ReportThreatColumns,
} from './tablesConfig/ReportThreat';

export const BriefFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return (
    <>
      <BriefReportDisasterTable
        columns={NumAffected1Columns}
        columnGroup={NumAffected1ColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={NumAffected2Columns}
        columnGroup={NumAffected2ColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={HouseSocialColumns}
        columnGroup={HouseSocialColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={AgricultureColumns}
        columnGroup={AgricultureColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={InfrastructureColumns}
        columnGroup={InfrastructureColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={IrrigationColumns}
        columnGroup={IrrigationColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={ShelterNeedsColumns}
        columnGroup={ShelterNeedsColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={EducationNeedsColumns}
        columnGroup={EducationNeedsColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={WaterNeedsColumns}
        columnGroup={WaterNeedsColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={HealthNeedsColumns}
        columnGroup={HealthNeedsColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={ReportFoodNeedsColumns}
        columnGroup={ReportFoodNeedsColumnGroup}
        data={report}
      />
      <BriefReportDisasterTable
        columns={ReportThreatColumns}
        columnGroup={ReportThreatColumnGroup}
        data={report}
      />
    </>
  );
};
