import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const AgricultureForestColumns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.CropAff, INCIDENT),
  getColumnSetup(IncidentSpecific.CropDam, INCIDENT),
  getColumnSetup(IncidentSpecific.SamnabAff, INCIDENT),
  getColumnSetup(IncidentSpecific.SamnabDam, INCIDENT),
  getColumnSetup(IncidentSpecific.PaddyAff, INCIDENT),
  getColumnSetup(IncidentSpecific.PaddyDam, INCIDENT),
  getColumnSetup(IncidentSpecific.CowDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.BaffoDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.PigDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.ChickDeath, INCIDENT),
  getColumnSetup(IncidentSpecific.NumJungleAf, INCIDENT),
  getColumnSetup(IncidentSpecific.FarmAf, INCIDENT),
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
