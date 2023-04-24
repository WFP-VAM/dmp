import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { KoboCommonKeys } from '@wfp-dmp/interfaces';

import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from 'components/FormValidation/FloodFormValidation/tablesConfig/NumAffected-1';
import { getLocationColumnSetup } from 'utils/tableFormatting';

export const detailedNumAffected1Columns: GridColDef[] = [
  getLocationColumnSetup(KoboCommonKeys.province),
  getLocationColumnSetup(KoboCommonKeys.district),
  getLocationColumnSetup(KoboCommonKeys.commune),
  ...NumAffected1Columns,
];

export const detailedNumAffected1ColumnGroup: GridColumnGroupingModel =
  NumAffected1ColumnGroup;
