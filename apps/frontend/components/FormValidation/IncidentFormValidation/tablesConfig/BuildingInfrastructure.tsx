import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const BuildingInfrastructureColumns: GridColDef[] = [
  getColumnSetup({ field: IncidentSpecific.PartlyBurn, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.CompletBurn, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.SchAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.SchDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.HealthAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.HealthDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.RivBreakLo, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.RivBreakWid, disaster: INCIDENT }),
  getColumnSetup({
    field: IncidentSpecific.NationalRod,
    disaster: INCIDENT,
    width: 8 * 12,
  }),
  getColumnSetup({
    field: IncidentSpecific.RuralRoad,
    disaster: INCIDENT,
    width: 8 * 12,
  }),
  getColumnSetup({
    field: IncidentSpecific.Bridge,
    disaster: INCIDENT,
    width: 8 * 12,
  }),
];

const BuildingInfrastructureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('house', INCIDENT),
    children: [
      { field: IncidentSpecific.PartlyBurn },
      { field: IncidentSpecific.CompletBurn },
    ],
  },
  {
    ...getGroupSetup('school', INCIDENT),
    children: [
      { field: IncidentSpecific.SchAff },
      { field: IncidentSpecific.SchDam },
    ],
  },
  {
    ...getGroupSetup('health', INCIDENT),
    children: [
      { field: IncidentSpecific.HealthAff },
      { field: IncidentSpecific.HealthDam },
    ],
  },
  {
    ...getGroupSetup('landslides', INCIDENT),
    children: [
      { field: IncidentSpecific.RivBreakLo },
      { field: IncidentSpecific.RivBreakWid },
      { field: IncidentSpecific.NationalRod },
      { field: IncidentSpecific.RuralRoad },
      { field: IncidentSpecific.Bridge },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'buildingInfrastructure',
  disaster: INCIDENT,
  additionalChildren: [],
};

export const BuildingInfrastructureColumnSettings = {
  columns: BuildingInfrastructureColumns,
  columnGroup: BuildingInfrastructureColumnGroup,
  groupParams,
};
