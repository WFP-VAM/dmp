import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffectedColumns: GridColDef[] = [
  getColumnSetup({ field: DroughtSpecific.NumVillAff, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumFamAff, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumPeoAff, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumMe, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumFe, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumKid, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumOld, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumDisMising, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.TNumDeath, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumMeDeath, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumFeDeath, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumKidDeath, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumOldDeath, disaster: DROUGHT }),
  getColumnSetup({ field: DroughtSpecific.NumDisDeath, disaster: DROUGHT }),
];

const NumAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('noWater', DROUGHT),
    children: [
      { field: DroughtSpecific.NumFamAff },
      { field: DroughtSpecific.NumPeoAff },
      { field: DroughtSpecific.NumMe },
      { field: DroughtSpecific.NumFe },
      { field: DroughtSpecific.NumKid },
      { field: DroughtSpecific.NumOld },
      { field: DroughtSpecific.NumDisMising },
    ],
  },
  {
    ...getGroupSetup('deathToll', DROUGHT),
    children: [
      { field: DroughtSpecific.TNumDeath },
      { field: DroughtSpecific.NumMeDeath },
      { field: DroughtSpecific.NumFeDeath },
      { field: DroughtSpecific.NumKidDeath },
      { field: DroughtSpecific.NumOldDeath },
      { field: DroughtSpecific.NumDisDeath },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: DROUGHT,
  additionalChildren: [{ field: DroughtSpecific.NumVillAff }],
};

export const NumAffectedColumnSettings = {
  columns: NumAffectedColumns,
  columnGroup: NumAffectedColumnGroup,
  groupParams,
};
