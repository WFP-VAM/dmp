import { AgricultureForestColumnSettings } from './tablesConfig/AgricultureForest';
import { BuildingInfrastructureColumnSettings } from './tablesConfig/BuildingInfrastructure';
import { NumAffected1ColumnSettings } from './tablesConfig/NumAffected-1';
import { NumAffected2ColumnSettings } from './tablesConfig/NumAffected-2';
import { SocialColumnSettings } from './tablesConfig/Social';

export const incidenTablesMapping = [
  NumAffected1ColumnSettings,
  NumAffected2ColumnSettings,
  BuildingInfrastructureColumnSettings,
  SocialColumnSettings,
  AgricultureForestColumnSettings,
];
