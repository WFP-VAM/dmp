import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { INCIDENT, IncidentSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const SocialColumns: GridColDef[] = [
  getColumnSetup(IncidentSpecific.PagoAff, INCIDENT),
  getColumnSetup(IncidentSpecific.PagoDam, INCIDENT),
  getColumnSetup(IncidentSpecific.BuildingAff, INCIDENT),
  getColumnSetup(IncidentSpecific.BuildingDam, INCIDENT),
  getColumnSetup(IncidentSpecific.MarketAff, INCIDENT),
  getColumnSetup(IncidentSpecific.MarketDam, INCIDENT),
  getColumnSetup(IncidentSpecific.StorageAff, INCIDENT),
  getColumnSetup(IncidentSpecific.StorageDam, INCIDENT),
  getColumnSetup(IncidentSpecific.CraftAff, INCIDENT),
  getColumnSetup(IncidentSpecific.CraftDam, INCIDENT),
];

const SocialColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('social', INCIDENT),
    children: [
      { field: IncidentSpecific.NumVillAff },

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
    ],
  },
];

export const SocialColumnSettings = {
  columns: SocialColumns,
  columnGroup: SocialColumnGroup,
};
