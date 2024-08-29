import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const WaterHouseholdColumns: GridColDef[] = [
  getColumnSetup({ field: DroughtSpecific.NuVilNedHep, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.TNuFamNeHo2, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.NumPeople,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumMen,
    disaster: DROUGHT,
    width: 60,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumWomen,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumKids,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumElder,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({ field: DroughtSpecific.NumDis, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.NumWatTank,
    disaster: DROUGHT,
    width: 8 * 16,
  }),
  getColumnSetup({
    field: DroughtSpecific.NuStorageFam,
    disaster: DROUGHT,
    width: 8 * 19,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumWateTank,
    disaster: DROUGHT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFilter,
    disaster: DROUGHT,
    width: 8 * 12,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumWatePur,
    disaster: DROUGHT,
    width: 8 * 14,
  }),
];

const WaterHouseholdColumnGroup: GridColumnGroupingModel = [
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

const groupParams: ColumnSetupParams = {
  groupId: 'waterHousehold',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const WaterHouseholdColumnSettings = {
  columns: WaterHouseholdColumns,
  columnGroup: WaterHouseholdColumnGroup,
  groupParams,
};
