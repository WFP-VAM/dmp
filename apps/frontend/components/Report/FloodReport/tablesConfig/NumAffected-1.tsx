import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-1';
import {
  addBriefReportLocationColumns,
  addDetailedReportLocationColumns,
} from 'utils/tableFormatting';

export const detailedNumAffected1Columns: GridColDef[] =
  addDetailedReportLocationColumns(NumAffected1Columns);

export const briefNumAffected1Columns: GridColDef[] =
  addBriefReportLocationColumns(NumAffected1Columns);

export const reportNumAffected1ColumnGroup: GridColumnGroupingModel =
  NumAffected1ColumnGroup;
