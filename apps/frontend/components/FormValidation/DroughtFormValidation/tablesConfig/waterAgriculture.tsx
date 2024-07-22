import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const WaterAgricultureColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.LandSize, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.PumMachine, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumGasoline, DROUGHT, 120),
  getColumnSetup(DroughtSpecific.NumFam, DROUGHT, 100),
];

const WaterAgricultureColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('waterAgriculture', DROUGHT, true),
    children: [
      ...(detailed
        ? [{ field: KoboCommonKeys.location }]
        : [
            { field: KoboCommonKeys.province },
            { field: KoboCommonKeys.district },
            { field: KoboCommonKeys.commune },
          ]),
      { field: DroughtSpecific.LandSize },
      { field: DroughtSpecific.PumMachine },
      { field: DroughtSpecific.NumGasoline },
      { field: DroughtSpecific.NumFam },
    ],
  },
];

export const WaterAgricultureColumnSettings = {
  columns: WaterAgricultureColumns,
  columnGroup: WaterAgricultureColumnGroup,
  hideTopRightBorder: true,
};
