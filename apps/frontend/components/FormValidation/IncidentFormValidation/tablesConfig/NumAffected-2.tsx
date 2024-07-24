import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  INCIDENT,
  IncidentSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const NumAffected2Columns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.NumPeoEva, INCIDENT, 8 * 12),
  getColumnSetup(IncidentSpecific.NumFamEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumMeEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumKidEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumOldEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDisEva, INCIDENT),
  getColumnSetup(IncidentSpecific.NumPeoRe, INCIDENT, 8 * 12),
  getColumnSetup(IncidentSpecific.NumFamRe, INCIDENT),
  getColumnSetup(IncidentSpecific.NumMeRe, INCIDENT),
  getColumnSetup(IncidentSpecific.NumFeRe, INCIDENT),
  getColumnSetup(IncidentSpecific.NumKidRe, INCIDENT),
  getColumnSetup(IncidentSpecific.NumOldRe, INCIDENT),
  getColumnSetup(IncidentSpecific.NumDisRe, INCIDENT),
];

const NumAffected2ColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('victimsAffected', INCIDENT, 'start'),
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
    ...getGroupSetup('evacuated', INCIDENT),
    children: [
      { field: IncidentSpecific.NumFamEva },
      { field: IncidentSpecific.NumPeoEva },
      { field: IncidentSpecific.NumMeEva },
      { field: IncidentSpecific.NumFeEva },
      { field: IncidentSpecific.NumKidEva },
      { field: IncidentSpecific.NumOldEva },
      { field: IncidentSpecific.NumDisEva },
    ],
  },
  {
    ...getGroupSetup('relocated', INCIDENT),
    children: [
      { field: IncidentSpecific.NumFamRe },
      { field: IncidentSpecific.NumPeoRe },
      { field: IncidentSpecific.NumMeRe },
      { field: IncidentSpecific.NumFeRe },
      { field: IncidentSpecific.NumKidRe },
      { field: IncidentSpecific.NumOldRe },
      { field: IncidentSpecific.NumDisRe },
    ],
  },
];

export const NumAffected2ColumnSettings = {
  columns: NumAffected2Columns,
  columnGroup: NumAffected2ColumnGroup,
};
