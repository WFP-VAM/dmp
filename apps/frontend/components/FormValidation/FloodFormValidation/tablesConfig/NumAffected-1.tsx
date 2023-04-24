import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecificType } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

// TODO - Finish reorganizing this file for typing
const NumAffected1ColumnsKeys: FloodSpecificType[] = [
  'NumVillAff',
  'NumPeoAff',
  'NumFamAff',
  'NumFeAff',
  'NumFeAff',
  'NumTDeath',
  'NumMeDeath',
  'NumFeDeath',
  'NumKidDeath',
  'NumOldDeath',
  'NumDisDeath',
  'NumTMissing',
  'NumMeMissing',
  'NumFeMissing',
  'NumKidMissing',
  'NumOldMissing',
  'NumDisMissing',
  'NumTInjure',
  'NumMeInjure',
  'NumFeInjure',
  'NumKidInjure',
  'NumOldInjure',
  'NumDisInjure',
];

export const NumAffected1Columns: GridColDef[] = NumAffected1ColumnsKeys.map(
  key => getColumnSetup(key, FLOOD),
);

const keyAsField = (key: FloodSpecificType) => ({ field: key });
const keysAsChildren = (keys: FloodSpecificType[]) => keys.map(keyAsField);

export const NumAffected1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', FLOOD),
    children: [
      keyAsField('NumVillAff'),
      {
        ...getGroupSetup('totalAffected', FLOOD),
        children: keysAsChildren(['NumPeoAff', 'NumFamAff', 'NumFeAff']),
      },
      {
        ...getGroupSetup('deathToll', FLOOD),
        children: [
          { field: 'NumTDeath' },
          { field: 'NumMeDeath' },
          { field: 'NumFeDeath' },
          { field: 'NumKidDeath' },
          { field: 'NumOldDeath' },
          { field: 'NumDisDeath' },
        ],
      },
      {
        ...getGroupSetup('missing', FLOOD),
        children: [
          { field: 'NumTMissing' },
          { field: 'NumMeMissing' },
          { field: 'NumFeMissing' },
          { field: 'NumKidMissing' },
          { field: 'NumOldMissing' },
          { field: 'NumDisMissing' },
        ],
      },
      {
        ...getGroupSetup('injured', FLOOD),
        children: [
          { field: 'NumTInjure' },
          { field: 'NumMeInjure' },
          { field: 'NumFeInjure' },
          { field: 'NumKidInjure' },
          { field: 'NumOldInjure' },
          { field: 'NumDisInjure' },
        ],
      },
    ],
  },
];
