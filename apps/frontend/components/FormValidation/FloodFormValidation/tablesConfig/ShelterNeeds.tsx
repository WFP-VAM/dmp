import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const ShelterNeedsColumns: GridColDef[] = [
  getColumnSetup({
    field: FloodSpecific.NumFamTent,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoTent,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFamBuil,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoBuil,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumFamRela,
    disaster: FLOOD,
    width: 150,
  }),
  getColumnSetup({
    field: FloodSpecific.NumPeoRela,
    disaster: FLOOD,
    width: 150,
  }),
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
