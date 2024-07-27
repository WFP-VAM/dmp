import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const colWidth = 8 * 9;

const HouseSocialColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumHouAff, FLOOD),
  getColumnSetup(FloodSpecific.NumHouDam, FLOOD),
  getColumnSetup(FloodSpecific.NumSchoAff, FLOOD),
  getColumnSetup(FloodSpecific.NumSchoDam, FLOOD),
  getColumnSetup(FloodSpecific.NumAffHeal, FLOOD),
  getColumnSetup(FloodSpecific.NumDamHeal, FLOOD),
  getColumnSetup(FloodSpecific.NumPagoAff, FLOOD),
  getColumnSetup(FloodSpecific.NumPagoDam, FLOOD),
  getColumnSetup(FloodSpecific.NumBuilAff, FLOOD, colWidth + 8 * 2),
  getColumnSetup(FloodSpecific.NumBuilDam, FLOOD, colWidth + 8 * 2),
  getColumnSetup(FloodSpecific.NumShopAff, FLOOD),
  getColumnSetup(FloodSpecific.NumShopDam, FLOOD),
  getColumnSetup(FloodSpecific.NumWareHAff, FLOOD),
  getColumnSetup(FloodSpecific.NumWareHDam, FLOOD),
  getColumnSetup(FloodSpecific.NumCraftAff, FLOOD),
  getColumnSetup(FloodSpecific.NumCraftDam, FLOOD),
];

const HouseSocialColumnGroup = (detailed: boolean): GridColumnGroupingModel => [
  {
    ...getGroupSetup('houseSocial', FLOOD, true),
    children: [
      ...(detailed
        ? [{ field: KoboCommonKeys.location }]
        : [
            { field: KoboCommonKeys.province },
            { field: KoboCommonKeys.district },
            { field: KoboCommonKeys.commune },
          ]),
    ],
  },
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

export const HouseSocialColumnSettings = {
  columns: HouseSocialColumns,
  columnGroup: HouseSocialColumnGroup,
};
