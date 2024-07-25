import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const WaterEducationHealthColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.NumWatStor,
    disaster: DROUGHT,
    width: 8 * 12,
  }),
  getColumnSetup({
    field: DroughtSpecific.WatSorRepar,
    disaster: DROUGHT,
    width: 8 * 20,
  }),
  getColumnSetup({
    field: DroughtSpecific.WatStoRepar,
    disaster: DROUGHT,
    width: 8 * 20,
  }),
  getColumnSetup({
    field: DroughtSpecific.SolarNeed,
    disaster: DROUGHT,
    width: 8 * 14,
  }),
  getColumnSetup({
    field: DroughtSpecific.FanNeed,
    disaster: DROUGHT,
    width: 100,
  }),
  getColumnSetup({
    field: DroughtSpecific.WatStorNed,
    disaster: DROUGHT,
    width: 8 * 16,
  }),
  getColumnSetup({
    field: DroughtSpecific.WatSorRep,
    disaster: DROUGHT,
    width: 8 * 20,
  }),
  getColumnSetup({
    field: DroughtSpecific.WatStoRep,
    disaster: DROUGHT,
    width: 8 * 20,
  }),
  getColumnSetup({
    field: DroughtSpecific.NuSolarNeed,
    disaster: DROUGHT,
    width: 8 * 16,
  }),
  getColumnSetup({
    field: DroughtSpecific.NumFanNeed,
    disaster: DROUGHT,
    width: 100,
  }),
];

const WaterEducationHealthColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('waterEducation', DROUGHT),
    children: [
      { field: DroughtSpecific.NumWatStor },
      { field: DroughtSpecific.WatSorRepar },
      { field: DroughtSpecific.WatStoRepar },
      { field: DroughtSpecific.SolarNeed },
      { field: DroughtSpecific.FanNeed },
    ],
  },
  {
    ...getGroupSetup('waterHealth', DROUGHT),
    children: [
      { field: DroughtSpecific.WatStorNed },
      { field: DroughtSpecific.WatSorRep },
      { field: DroughtSpecific.WatStoRep },
      { field: DroughtSpecific.NuSolarNeed },
      { field: DroughtSpecific.NumFanNeed },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'waterEducationHealth',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const WaterEducationHealthColumnSettings = {
  columns: WaterEducationHealthColumns,
  columnGroup: WaterEducationHealthColumnGroup,
  groupParams,
};
