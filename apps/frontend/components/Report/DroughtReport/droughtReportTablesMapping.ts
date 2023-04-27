import { AgricultureColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/Agriculture';
import { IrrigationColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/Irrigation';
import { NumAffectedColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/NumAffected';
import { WaterEducationHealthColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/WaterEducationHealth';
import { WaterHouseholdColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/WaterHousehold';
import { FoodWorkColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/foodWork';
import { WaterAgricultureColumnSettings } from 'components/FormValidation/DroughtFormValidation/tablesConfig/waterAgriculture';

import { ReportDefenseSecurityColumnSettings } from './tablesConfig/ReportDefenseSecurity';
import { ReportSocialSectorAffectedColumnSettings } from './tablesConfig/ReportSocialSectorAffected';

export const droughtReportTablesMapping = [
  NumAffectedColumnSettings,
  AgricultureColumnSettings,
  ReportSocialSectorAffectedColumnSettings,
  IrrigationColumnSettings,
  WaterHouseholdColumnSettings,
  WaterEducationHealthColumnSettings,
  WaterAgricultureColumnSettings,
  FoodWorkColumnSettings,
  ReportDefenseSecurityColumnSettings,
];
