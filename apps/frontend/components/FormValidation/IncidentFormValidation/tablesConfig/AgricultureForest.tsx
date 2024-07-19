import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  INCIDENT,
  IncidentSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

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

const AgricultureForestColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('social', INCIDENT, true),
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

export const AgricultureForestColumnSettings = {
  columns: AgricultureForestColumns,
  columnGroup: AgricultureForestColumnGroup,
};
