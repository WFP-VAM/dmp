import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

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
  getColumnSetup(DroughtSpecific.NumWatTank, DROUGHT, 110),
  getColumnSetup(DroughtSpecific.NuStorageFam, DROUGHT, 110),
  getColumnSetup(DroughtSpecific.NumWateTank, DROUGHT, 110),
  getColumnSetup(DroughtSpecific.NumFilter, DROUGHT, 90),
  getColumnSetup(DroughtSpecific.NumWatePur, DROUGHT, 100),
];

const WaterHouseholdColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('waterHousehold', DROUGHT),
    children: [
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
    ],
  },
];

export const WaterHouseholdColumnSettings = {
  columns: WaterHouseholdColumns,
  columnGroup: WaterHouseholdColumnGroup,
};
