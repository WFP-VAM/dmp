import { IntlShape } from 'react-intl';

import { AgricultureColumnSettings } from './tablesConfig/Agriculture';
import { getDefenseSecurityColumnSettings } from './tablesConfig/DefenseSecurity';
import { IrrigationColumnSettings } from './tablesConfig/Irrigation';
import { NumAffectedColumnSettings } from './tablesConfig/NumAffected';
import { getSocialSectorAffectedColumnSettings } from './tablesConfig/SocialSectorAffected';
import { WaterEducationHealthColumnSettings } from './tablesConfig/WaterEducationHealth';
import { WaterHouseholdColumnSettings } from './tablesConfig/WaterHousehold';
import { FoodWorkColumnSettings } from './tablesConfig/foodWork';
import { WaterAgricultureColumnSettings } from './tablesConfig/waterAgriculture';

export const getDroughtTablesMapping = (intl: IntlShape) => [
  NumAffectedColumnSettings,
  AgricultureColumnSettings,
  getSocialSectorAffectedColumnSettings(intl),
  IrrigationColumnSettings,
  WaterHouseholdColumnSettings,
  WaterEducationHealthColumnSettings,
  WaterAgricultureColumnSettings,
  FoodWorkColumnSettings,
  getDefenseSecurityColumnSettings(intl),
];
