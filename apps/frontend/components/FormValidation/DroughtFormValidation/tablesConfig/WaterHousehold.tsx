import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterHouseholdColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NuVilNedHep, DROUGHT),
  getColumnSetup(DroughtSpecific.TNuFamNeHo2, DROUGHT),
  getColumnSetup(DroughtSpecific.NumPeople, DROUGHT),
  getColumnSetup(DroughtSpecific.NumMen, DROUGHT),
  getColumnSetup(DroughtSpecific.NumWomen, DROUGHT),
  getColumnSetup(DroughtSpecific.NumKids, DROUGHT),
  getColumnSetup(DroughtSpecific.NumElder, DROUGHT),
  getColumnSetup(DroughtSpecific.NumDis, DROUGHT),
  getColumnSetup(DroughtSpecific.NumWatTank, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NuStorageFam, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumWateTank, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumFilter, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumWatePur, DROUGHT, 120),
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
