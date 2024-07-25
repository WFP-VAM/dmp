import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const BuildingInfrastructureColumns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.PartlyBurn, INCIDENT),
  getColumnSetup(IncidentSpecific.CompletBurn, INCIDENT),
  getColumnSetup(IncidentSpecific.SchAff, INCIDENT),
  getColumnSetup(IncidentSpecific.SchDam, INCIDENT),
  getColumnSetup(IncidentSpecific.HealthAff, INCIDENT),
  getColumnSetup(IncidentSpecific.HealthDam, INCIDENT),
  getColumnSetup(IncidentSpecific.RivBreakLo, INCIDENT),
  getColumnSetup(IncidentSpecific.RivBreakWid, INCIDENT),
  getColumnSetup(IncidentSpecific.NationalRod, INCIDENT, 8 * 12),
  getColumnSetup(IncidentSpecific.RuralRoad, INCIDENT, 8 * 12),
  getColumnSetup(IncidentSpecific.Bridge, INCIDENT, 8 * 12),
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
