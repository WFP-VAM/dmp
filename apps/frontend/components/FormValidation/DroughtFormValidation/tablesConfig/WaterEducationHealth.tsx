import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterEducationHealthColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NumWatStor, DROUGHT, 8 * 12),
  getColumnSetup(DroughtSpecific.WatSorRepar, DROUGHT, 8 * 20),
  getColumnSetup(DroughtSpecific.WatStoRepar, DROUGHT, 8 * 20),
  getColumnSetup(DroughtSpecific.SolarNeed, DROUGHT, 8 * 14),
  getColumnSetup(DroughtSpecific.FanNeed, DROUGHT, 100),
  getColumnSetup(DroughtSpecific.WatStorNed, DROUGHT, 8 * 16),
  getColumnSetup(DroughtSpecific.WatSorRep, DROUGHT, 8 * 20),
  getColumnSetup(DroughtSpecific.WatStoRep, DROUGHT, 8 * 20),
  getColumnSetup(DroughtSpecific.NuSolarNeed, DROUGHT, 8 * 16),
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
