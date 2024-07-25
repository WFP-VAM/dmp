import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const AgricultureForestColumns: GridColDef[] = [
  getColumnSetup({ field: IncidentSpecific.CropAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.CropDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.SamnabAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.SamnabDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.PaddyAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.PaddyDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.CowDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.BaffoDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.PigDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.ChickDeath, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.NumJungleAf, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.FarmAf, disaster: INCIDENT }),
];

const AgricultureForestColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('crop', INCIDENT),
    children: [
      { field: IncidentSpecific.CropAff },
      { field: IncidentSpecific.CropDam },
    ],
  },
  {
    ...getGroupSetup('transplanted', INCIDENT),
    children: [
      { field: IncidentSpecific.SamnabAff },
      { field: IncidentSpecific.SamnabDam },
    ],
  },
  {
    ...getGroupSetup('paddy', INCIDENT),
    children: [
      { field: IncidentSpecific.PaddyAff },
      { field: IncidentSpecific.PaddyDam },
    ],
  },
  {
    ...getGroupSetup('livestock', INCIDENT),
    children: [
      { field: IncidentSpecific.CowDeath },
      { field: IncidentSpecific.BaffoDeath },
      { field: IncidentSpecific.PigDeath },
      { field: IncidentSpecific.ChickDeath },
    ],
  },
  {
    ...getGroupSetup('forestFarm', INCIDENT),
    children: [
      { field: IncidentSpecific.NumJungleAf },
      { field: IncidentSpecific.FarmAf },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'social',
  disaster: INCIDENT,
  additionalChildren: [],
};

export const AgricultureForestColumnSettings = {
  columns: AgricultureForestColumns,
  columnGroup: AgricultureForestColumnGroup,
  groupParams,
};
