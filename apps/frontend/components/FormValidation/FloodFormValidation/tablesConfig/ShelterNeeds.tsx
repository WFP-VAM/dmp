import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const ShelterNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamTent, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoTent, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumFamBuil, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoBuil, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumFamRela, FLOOD, 200),
  getColumnSetup(FloodSpecific.NumPeoRela, FLOOD, 200),
];

export const ShelterNeedsColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('shelterNeeds', FLOOD),
    children: [
      {
        ...getGroupSetup('shelterTent', FLOOD),
        children: [
          { field: FloodSpecific.NumFamTent },
          { field: FloodSpecific.NumPeoTent },
        ],
      },
      {
        ...getGroupSetup('shelterBuilding', FLOOD),
        children: [
          { field: FloodSpecific.NumFamBuil },
          { field: FloodSpecific.NumPeoBuil },
        ],
      },
      {
        ...getGroupSetup('shelterRelatives', FLOOD),
        children: [
          { field: FloodSpecific.NumFamRela },
          { field: FloodSpecific.NumPeoRela },
        ],
      },
    ],
  },
];
