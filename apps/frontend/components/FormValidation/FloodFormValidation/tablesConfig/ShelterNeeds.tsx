import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ShelterNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NumFamTent, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoTent, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumFamBuil, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoBuil, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumFamRela, FLOOD, 150),
  getColumnSetup(FloodSpecific.NumPeoRela, FLOOD, 150),
];

const ShelterNeedsColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('shelterNeeds', FLOOD, true),
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

export const ShelterNeedsColumnSettings = {
  columns: ShelterNeedsColumns,
  columnGroup: ShelterNeedsColumnGroup,
};
