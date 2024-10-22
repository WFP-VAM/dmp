import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';
import { IntlShape } from 'react-intl';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const getFoodNeedsColumns = (intl: IntlShape): GridColDef[] => [
  getColumnSetup({
    field: FloodSpecific.NumFamNoFod,
    disaster: FLOOD,
    width: 200,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoNoFod,
    disaster: FLOOD,
    width: 200,
  }),
  getColumnSetup({
    field: FloodSpecific.FamNoFod7d,
    disaster: FLOOD,
    width: 200,
  }),
  getColumnSetup({
    field: FloodSpecific.NumActShop,
    disaster: FLOOD,
    width: 200,
  }),
  getColumnSetup({
    field: FloodSpecific.NumNoActShop,
    disaster: FLOOD,
    width: 200,
  }),
  getColumnSetup({
    field: FloodSpecific.RicePrice,
    disaster: FLOOD,
    width: 200,
    opts: {
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
    },
  }),
];

const FoodNeedsColumnGroup: GridColumnGroupingModel = [
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

export const getFoodNeedsColumnSettings = (intl: IntlShape) => ({
  columns: getFoodNeedsColumns(intl),
  columnGroup: FoodNeedsColumnGroup,
});
