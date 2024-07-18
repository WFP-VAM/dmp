import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterEducationHealthColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NumWatStor, DROUGHT),
  getColumnSetup(DroughtSpecific.WatSorRepar, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.WatStoRepar, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.SolarNeed, DROUGHT, 100),
  getColumnSetup(DroughtSpecific.FanNeed, DROUGHT, 100),
  getColumnSetup(DroughtSpecific.WatStorNed, DROUGHT),
  getColumnSetup(DroughtSpecific.WatSorRep, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.WatStoRep, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NuSolarNeed, DROUGHT, 100),
  getColumnSetup(DroughtSpecific.NumFanNeed, DROUGHT, 100),
];

const WaterEducationHealthColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('waterEducationHealth', DROUGHT, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
    ],
  },
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

export const WaterEducationHealthColumnSettings = {
  columns: WaterEducationHealthColumns,
  columnGroup: WaterEducationHealthColumnGroup,
};
