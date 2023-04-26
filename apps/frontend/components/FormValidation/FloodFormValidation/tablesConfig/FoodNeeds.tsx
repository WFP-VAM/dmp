import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';
import { IntlShape } from 'react-intl';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const getFoodNeedsColumns = (intl: IntlShape): GridColDef[] => [
  getColumnSetup(FloodSpecific.NumFamNoFod, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoNoFod, FLOOD, 200),
  getColumnSetup(FloodSpecific.FamNoFod7d, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumActShop, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumNoActShop, FLOOD, 200),
  getColumnSetup(FloodSpecific.RicePrice, FLOOD, 200, {
    type: 'singleSelect',
    valueOptions: [
      {
        value: '1',
        label: intl.formatMessage({
          id: 'table.FLOOD.dropdowns.RicePriceUp',
        }),
      },
      {
        value: '2',
        label: intl.formatMessage({
          id: 'table.FLOOD.dropdowns.RicePriceStable',
        }),
      },
      { value: '', label: '' },
    ],
  }),
];

export const FoodNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('foodNeeds', FLOOD),
    children: [
      {
        ...getGroupSetup('foodPeople', FLOOD),
        children: [
          { field: FloodSpecific.NumFamNoFod },
          { field: FloodSpecific.NumPeoNoFod },
        ],
      },
      { field: FloodSpecific.FamNoFod7d },
      {
        ...getGroupSetup('foodMarket', FLOOD),
        children: [
          { field: FloodSpecific.NumActShop },
          { field: FloodSpecific.NumNoActShop },
        ],
      },
      { field: FloodSpecific.RicePrice },
    ],
  },
];
