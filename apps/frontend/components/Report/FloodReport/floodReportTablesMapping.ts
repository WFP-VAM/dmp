import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import { AgricultureColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/Agriculture';
import { EducationNeedsSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/EducationNeeds';
import { HealthNeedsColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/HealthNeeds';
import { HouseSocialColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/HouseSocial';
import { InfrastructureColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/Infrastructure';
import { IrrigationColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/Irrigation';
import { NumAffected1ColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-1';
import { NumAffected2ColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-2';
import { ShelterNeedsColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/ShelterNeeds';
import { WaterNeedsColumnSettings } from 'components/FormValidation/FloodFormValidation/tablesConfig/WaterNeeds';

import { ReportFoodNeedsColumnSettings } from './tablesConfig/ReportFoodNeeds';
import { ReportThreatColumnSettings } from './tablesConfig/ReportThreat';

export const floodReportTablesMapping: {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  columnHeaderHeight?: number;
}[] = [
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
  ReportFoodNeedsColumnSettings,
  ReportThreatColumnSettings,
];
