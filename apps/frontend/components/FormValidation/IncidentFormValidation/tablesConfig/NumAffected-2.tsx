import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffected2Columns: GridColDef[] = [
  getColumnSetup({
    field: IncidentSpecific.NumPeoEva,
    disaster: INCIDENT,
    width: 8 * 12,
  }),
  getColumnSetup({ field: IncidentSpecific.NumFamEva, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumMeEva, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeEva, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumKidEva, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumOldEva, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDisEva, disaster: INCIDENT }),
  getColumnSetup({
    field: IncidentSpecific.NumPeoRe,
    disaster: INCIDENT,
    width: 8 * 12,
  }),
  getColumnSetup({ field: IncidentSpecific.NumFamRe, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumMeRe, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumFeRe, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumKidRe, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumOldRe, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumDisRe, disaster: INCIDENT }),
];

const NumAffected2ColumnGroup: GridColumnGroupingModel = [
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

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: INCIDENT,
  additionalChildren: [],
};

export const NumAffected2ColumnSettings = {
  columns: NumAffected2Columns,
  columnGroup: NumAffected2ColumnGroup,
  groupParams,
};
