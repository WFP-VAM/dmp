import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import {
  INCIDENT,
  IncidentSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const SocialColumns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.PagoAff, INCIDENT),
  getColumnSetup(IncidentSpecific.PagoDam, INCIDENT),
  getColumnSetup(IncidentSpecific.BuildingAff, INCIDENT, 8 * 10),
  getColumnSetup(IncidentSpecific.BuildingDam, INCIDENT, 8 * 10),
  getColumnSetup(IncidentSpecific.MarketAff, INCIDENT),
  getColumnSetup(IncidentSpecific.MarketDam, INCIDENT),
  getColumnSetup(IncidentSpecific.StorageAff, INCIDENT),
  getColumnSetup(IncidentSpecific.StorageDam, INCIDENT),
  getColumnSetup(IncidentSpecific.CraftAff, INCIDENT),
  getColumnSetup(IncidentSpecific.CraftDam, INCIDENT),
];

const SocialColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('social', INCIDENT, true),
    children: [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
    ],
  },
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
];

export const SocialColumnSettings = {
  columns: SocialColumns,
  columnGroup: SocialColumnGroup,
};
