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

export const floodReportTablesMapping = [
  { columns: NumAffected1Columns, columnGroup: NumAffected1ColumnGroup },
  { columns: NumAffected2Columns, columnGroup: NumAffected2ColumnGroup },
  { columns: HouseSocialColumns, columnGroup: HouseSocialColumnGroup },
  { columns: AgricultureColumns, columnGroup: AgricultureColumnGroup },
  { columns: InfrastructureColumns, columnGroup: InfrastructureColumnGroup },
  { columns: IrrigationColumns, columnGroup: IrrigationColumnGroup },
  { columns: ShelterNeedsColumns, columnGroup: ShelterNeedsColumnGroup },
  { columns: EducationNeedsColumns, columnGroup: EducationNeedsColumnGroup },
  { columns: WaterNeedsColumns, columnGroup: WaterNeedsColumnGroup },
  { columns: HealthNeedsColumns, columnGroup: HealthNeedsColumnGroup },
  { columns: ReportFoodNeedsColumns, columnGroup: ReportFoodNeedsColumnGroup },
  { columns: ReportThreatColumns, columnGroup: ReportThreatColumnGroup },
];
