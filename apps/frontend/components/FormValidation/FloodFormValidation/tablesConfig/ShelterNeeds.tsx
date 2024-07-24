import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const ShelterNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamTent, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoTent, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumFamBuil, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoBuil, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumFamRela, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoRela, FLOOD, 150),
];

const ShelterNeedsColumnGroup: GridColumnGroupingModel = [
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
];

const groupParams: ColumnSetupParams = {
  groupId: 'shelterNeeds',
  disaster: FLOOD,
  additionalChildren: [],
};

export const ShelterNeedsColumnSettings = {
  columns: ShelterNeedsColumns,
  columnGroup: ShelterNeedsColumnGroup,
  groupParams,
};
