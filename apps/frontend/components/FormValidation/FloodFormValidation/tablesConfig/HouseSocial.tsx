import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const colWidth = 8 * 9;

const HouseSocialColumns: GridColDef[] = [
  getColumnSetup({ field: FloodSpecific.NumHouAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumHouDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumSchoAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumSchoDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumAffHeal, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDamHeal, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumPagoAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumPagoDam, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumBuilAff,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.NumBuilDam,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({ field: FloodSpecific.NumShopAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumShopDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumWareHAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumWareHDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumCraftAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumCraftDam, disaster: FLOOD }),
];

const HouseSocialColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('house', FLOOD),
    children: [
      { field: FloodSpecific.NumHouAff },
      { field: FloodSpecific.NumHouDam },
    ],
  },
  {
    ...getGroupSetup('school', FLOOD),
    children: [
      { field: FloodSpecific.NumSchoAff },
      { field: FloodSpecific.NumSchoDam },
    ],
  },
  {
    ...getGroupSetup('hospital', FLOOD),
    children: [
      { field: FloodSpecific.NumAffHeal },
      { field: FloodSpecific.NumDamHeal },
    ],
  },
  {
    ...getGroupSetup('pagoda', FLOOD),
    children: [
      { field: FloodSpecific.NumPagoAff },
      { field: FloodSpecific.NumPagoDam },
    ],
  },
  {
    ...getGroupSetup('publicAdmin', FLOOD),
    children: [
      { field: FloodSpecific.NumBuilAff },
      { field: FloodSpecific.NumBuilDam },
    ],
  },
  {
    ...getGroupSetup('shop', FLOOD),
    children: [
      { field: FloodSpecific.NumShopAff },
      { field: FloodSpecific.NumShopDam },
    ],
  },
  {
    ...getGroupSetup('warehouse', FLOOD),
    children: [
      { field: FloodSpecific.NumWareHAff },
      { field: FloodSpecific.NumWareHDam },
    ],
  },
  {
    ...getGroupSetup('workshop', FLOOD),
    children: [
      { field: FloodSpecific.NumCraftAff },
      { field: FloodSpecific.NumCraftDam },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'houseSocial',
  disaster: FLOOD,
  additionalChildren: [],
};

export const HouseSocialColumnSettings = {
  columns: HouseSocialColumns,
  columnGroup: HouseSocialColumnGroup,
  groupParams,
};
