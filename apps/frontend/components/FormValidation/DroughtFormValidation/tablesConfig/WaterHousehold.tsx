import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterHouseholdColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NuVilNedHep, DROUGHT),
  getColumnSetup(DroughtSpecific.TNuFamNeHo2, DROUGHT),
  getColumnSetup(DroughtSpecific.NumPeople, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumMen, DROUGHT, 60),
  getColumnSetup(DroughtSpecific.NumWomen, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumKids, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumElder, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NumDis, DROUGHT),
  getColumnSetup(DroughtSpecific.NumWatTank, DROUGHT, 8 * 16),
  getColumnSetup(DroughtSpecific.NuStorageFam, DROUGHT, 8 * 19),
  getColumnSetup(DroughtSpecific.NumWateTank, DROUGHT, 8 * 10),
  getColumnSetup(DroughtSpecific.NumFilter, DROUGHT, 8 * 12),
  getColumnSetup(DroughtSpecific.NumWatePur, DROUGHT, 8 * 14),
];

const WaterHouseholdColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('waterHousehold', DROUGHT, true),
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
    ...getGroupSetup('waterPeople', DROUGHT),
    children: [
      { field: DroughtSpecific.NuVilNedHep },
      { field: DroughtSpecific.TNuFamNeHo2 },
      { field: DroughtSpecific.NumPeople },
      { field: DroughtSpecific.NumMen },
      { field: DroughtSpecific.NumWomen },
      { field: DroughtSpecific.NumKids },
      { field: DroughtSpecific.NumElder },
      { field: DroughtSpecific.NumDis },
    ],
  },
  {
    ...getGroupSetup('waterConsumable', DROUGHT),
    children: [
      { field: DroughtSpecific.NumWatTank },
      { field: DroughtSpecific.NuStorageFam },
      { field: DroughtSpecific.NumWateTank },
      { field: DroughtSpecific.NumFilter },
      { field: DroughtSpecific.NumWatePur },
    ],
  },
];

export const WaterHouseholdColumnSettings = {
  columns: WaterHouseholdColumns,
  columnGroup: WaterHouseholdColumnGroup,
};
