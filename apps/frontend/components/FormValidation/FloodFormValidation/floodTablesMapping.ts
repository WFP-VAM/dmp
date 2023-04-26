import { IntlShape } from 'react-intl';

import {
  AgricultureColumnGroup,
  AgricultureColumns,
} from './tablesConfig/Agriculture';
import {
  EducationNeedsColumnGroup,
  EducationNeedsColumns,
} from './tablesConfig/EducationNeeds';
import {
  FoodNeedsColumnGroup,
  getFoodNeedsColumns,
} from './tablesConfig/FoodNeeds';
import {
  HealthNeedsColumnGroup,
  HealthNeedsColumns,
} from './tablesConfig/HealthNeeds';
import {
  HouseSocialColumnGroup,
  HouseSocialColumns,
} from './tablesConfig/HouseSocial';
import {
  InfrastructureColumnGroup,
  InfrastructureColumns,
} from './tablesConfig/Infrastructure';
import {
  IrrigationColumnGroup,
  IrrigationColumns,
} from './tablesConfig/Irrigation';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from './tablesConfig/NumAffected-1';
import {
  NumAffected2ColumnGroup,
  NumAffected2Columns,
} from './tablesConfig/NumAffected-2';
import {
  ShelterNeedsColumnGroup,
  ShelterNeedsColumns,
} from './tablesConfig/ShelterNeeds';
import {
  WaterNeedsColumnGroup,
  WaterNeedsColumns,
} from './tablesConfig/WaterNeeds';

export const getFloodTablesMapping = (intl: IntlShape) => [
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
  {
    columns: getFoodNeedsColumns(intl),
    columnGroup: FoodNeedsColumnGroup,
  },
];
