import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const HouseSocialColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumHouAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumHouDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumSchoAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumSchoDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumAffHeal, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumDamHeal, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumPagoAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumPagoDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumBuilAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumBuilDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumShopAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumShopDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumWareHAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumWareHDam, FLOOD, 75),
  getColumnSetup(FloodSpecific.NumCraftAff, FLOOD, 65),
  getColumnSetup(FloodSpecific.NumCraftDam, FLOOD, 75),
];

export const HouseSocialColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('houseSocial', FLOOD),
    children: [
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
    ],
  },
];
