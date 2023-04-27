import { IntlShape } from 'react-intl';

import { AgricultureColumnSettings } from './tablesConfig/Agriculture';
import { EducationNeedsSettings } from './tablesConfig/EducationNeeds';
import { getFoodNeedsColumnSettings } from './tablesConfig/FoodNeeds';
import { HealthNeedsColumnSettings } from './tablesConfig/HealthNeeds';
import { HouseSocialColumnSettings } from './tablesConfig/HouseSocial';
import { InfrastructureColumnSettings } from './tablesConfig/Infrastructure';
import { IrrigationColumnSettings } from './tablesConfig/Irrigation';
import { NumAffected1ColumnSettings } from './tablesConfig/NumAffected-1';
import { NumAffected2ColumnSettings } from './tablesConfig/NumAffected-2';
import { ShelterNeedsColumnSettings } from './tablesConfig/ShelterNeeds';
import { WaterNeedsColumnSettings } from './tablesConfig/WaterNeeds';

export const getFloodTablesMapping = (intl: IntlShape) => [
  NumAffected1ColumnSettings,
  NumAffected2ColumnSettings,
  HouseSocialColumnSettings,
  AgricultureColumnSettings,
  InfrastructureColumnSettings,
  IrrigationColumnSettings,
  ShelterNeedsColumnSettings,
  EducationNeedsSettings,
  WaterNeedsColumnSettings,
  HealthNeedsColumnSettings,
  getFoodNeedsColumnSettings(intl),
];
