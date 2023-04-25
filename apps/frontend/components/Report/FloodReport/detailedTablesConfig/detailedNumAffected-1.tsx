import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-1';
import { addDetailedReportLocationColumns } from 'utils/tableFormatting';

export const detailedNumAffected1Columns: GridColDef[] =
  addDetailedReportLocationColumns(NumAffected1Columns);

export const detailedNumAffected1ColumnGroup: GridColumnGroupingModel =
  NumAffected1ColumnGroup;
