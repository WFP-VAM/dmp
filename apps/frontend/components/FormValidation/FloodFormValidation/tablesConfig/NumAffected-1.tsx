import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const NumAffected1Columns = (detailed: boolean): GridColDef[] => [
  getColumnSetup({ field: FloodSpecific.NumVillAff, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumPeoAff,
    disaster: FLOOD,
    fontWeight: 'bold',
    highlightColumn: !detailed,
  }),
  getColumnSetup({ field: FloodSpecific.NumFamAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeAff, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumTDeath,
    disaster: FLOOD,
    fontWeight: 'bold',
    highlightColumn: !detailed,
  }),
  getColumnSetup({ field: FloodSpecific.NumMeDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumKidDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumOldDeath, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDisDeath, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumTMissing,
    disaster: FLOOD,
    fontWeight: 'bold',
    highlightColumn: !detailed,
  }),
  getColumnSetup({ field: FloodSpecific.NumMeMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumKidMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumOldMissing, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDisMissing, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.NumTInjure,
    disaster: FLOOD,
    fontWeight: 'bold',
    highlightColumn: !detailed,
  }),
  getColumnSetup({ field: FloodSpecific.NumMeInjure, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumFeInjure, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumKidInjure, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumOldInjure, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.NumDisInjure, disaster: FLOOD }),
];

const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('totalAffected', FLOOD),
    children: [
      { field: FloodSpecific.NumPeoAff },
      { field: FloodSpecific.NumFamAff },
      { field: FloodSpecific.NumFeAff },
    ],
  },
  {
    ...getGroupSetup('deathToll', FLOOD),
    children: [
      { field: FloodSpecific.NumTDeath },
      { field: FloodSpecific.NumMeDeath },
      { field: FloodSpecific.NumFeDeath },
      { field: FloodSpecific.NumKidDeath },
      { field: FloodSpecific.NumOldDeath },
      { field: FloodSpecific.NumDisDeath },
    ],
  },
  {
    ...getGroupSetup('missing', FLOOD),
    children: [
      { field: FloodSpecific.NumTMissing },
      { field: FloodSpecific.NumMeMissing },
      { field: FloodSpecific.NumFeMissing },
      { field: FloodSpecific.NumKidMissing },
      { field: FloodSpecific.NumOldMissing },
      { field: FloodSpecific.NumDisMissing },
    ],
  },
  {
    ...getGroupSetup('injured', FLOOD),
    children: [
      { field: FloodSpecific.NumTInjure },
      { field: FloodSpecific.NumMeInjure },
      { field: FloodSpecific.NumFeInjure },
      { field: FloodSpecific.NumKidInjure },
      { field: FloodSpecific.NumOldInjure },
      { field: FloodSpecific.NumDisInjure },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'victimsAffected',
  disaster: FLOOD,
  additionalChildren: [{ field: FloodSpecific.NumVillAff }],
};

export const NumAffected1ColumnSettings = {
  columns: NumAffected1Columns,
  columnGroup: NumAffected1ColumnGroup,
  groupParams,
};
