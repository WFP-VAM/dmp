import { DetailedReportDisasterTable } from 'components/DisasterTable/DetailedReportDisasterTable';
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

export const DetailedFloodReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}): JSX.Element => {
  return (
    <>
      <DetailedReportDisasterTable
        columns={NumAffected1Columns}
        columnGroup={NumAffected1ColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={NumAffected2Columns}
        columnGroup={NumAffected2ColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={HouseSocialColumns}
        columnGroup={HouseSocialColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={AgricultureColumns}
        columnGroup={AgricultureColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={InfrastructureColumns}
        columnGroup={InfrastructureColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={IrrigationColumns}
        columnGroup={IrrigationColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={ShelterNeedsColumns}
        columnGroup={ShelterNeedsColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={EducationNeedsColumns}
        columnGroup={EducationNeedsColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={WaterNeedsColumns}
        columnGroup={WaterNeedsColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={HealthNeedsColumns}
        columnGroup={HealthNeedsColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={ReportFoodNeedsColumns}
        columnGroup={ReportFoodNeedsColumnGroup}
        data={report}
      />
      <DetailedReportDisasterTable
        columns={ReportThreatColumns}
        columnGroup={ReportThreatColumnGroup}
        data={report}
      />
    </>
  );
};
