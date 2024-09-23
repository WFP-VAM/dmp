import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const SocialColumns: GridColDef[] = [
  getColumnSetup({ field: IncidentSpecific.PagoAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.PagoDam, disaster: INCIDENT }),
  getColumnSetup({
    field: IncidentSpecific.BuildingAff,
    disaster: INCIDENT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: IncidentSpecific.BuildingDam,
    disaster: INCIDENT,
    width: 8 * 10,
  }),
  getColumnSetup({ field: IncidentSpecific.MarketAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.MarketDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.StorageAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.StorageDam, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.CraftAff, disaster: INCIDENT }),
  getColumnSetup({ field: IncidentSpecific.CraftDam, disaster: INCIDENT }),
  getColumnSetup({
    field: IncidentSpecific.integer_ws0la67,
    disaster: INCIDENT,
  }),
  getColumnSetup({
    field: IncidentSpecific.integer_da9ns07,
    disaster: INCIDENT,
  }),
];

const SocialColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('pagoda', INCIDENT),
    children: [
      { field: IncidentSpecific.PagoAff },
      { field: IncidentSpecific.PagoDam },
    ],
  },
  {
    ...getGroupSetup('admin', INCIDENT),
    children: [
      { field: IncidentSpecific.BuildingAff },
      { field: IncidentSpecific.BuildingDam },
    ],
  },
  {
    ...getGroupSetup('market', INCIDENT),
    children: [
      { field: IncidentSpecific.MarketAff },
      { field: IncidentSpecific.MarketDam },
    ],
  },
  {
    ...getGroupSetup('warehouse', INCIDENT),
    children: [
      { field: IncidentSpecific.StorageAff },
      { field: IncidentSpecific.StorageDam },
    ],
  },
  {
    ...getGroupSetup('workshop', INCIDENT),
    children: [
      { field: IncidentSpecific.CraftAff },
      { field: IncidentSpecific.CraftDam },
    ],
  },
  {
    ...getGroupSetup('factory', INCIDENT),
    children: [
      { field: IncidentSpecific.integer_ws0la67 },
      { field: IncidentSpecific.integer_da9ns07 },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'social',
  disaster: INCIDENT,
  additionalChildren: [],
};

export const SocialColumnSettings = {
  columns: SocialColumns,
  columnGroup: SocialColumnGroup,
  groupParams,
};
