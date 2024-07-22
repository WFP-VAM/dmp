import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const width = 200;

const HealthNeedsColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.NonActingH, FLOOD, width),
  getColumnSetup(FloodSpecific.PeoCanAceH, FLOOD, width),
  getColumnSetup(FloodSpecific.NumDoctor, FLOOD, width),
  getColumnSetup(FloodSpecific.NumNurse, FLOOD, width),
  getColumnSetup(FloodSpecific.NumStaff, FLOOD, width),
];

const HealthNeedsColumnGroup = (detailed: boolean): GridColumnGroupingModel => [
  {
    ...getGroupSetup('healthNeeds', FLOOD, true),
    children: [
      ...(detailed
        ? [{ field: KoboCommonKeys.location }]
        : [
            { field: KoboCommonKeys.province },
            { field: KoboCommonKeys.district },
            { field: KoboCommonKeys.commune },
          ]),
      { field: FloodSpecific.NonActingH },
      { field: FloodSpecific.PeoCanAceH },
      { field: FloodSpecific.NumDoctor },
      { field: FloodSpecific.NumNurse },
      { field: FloodSpecific.NumStaff },
    ],
  },
];

export const HealthNeedsColumnSettings = {
  columns: HealthNeedsColumns,
  columnGroup: HealthNeedsColumnGroup,
  hideTopRightBorder: true,
};
