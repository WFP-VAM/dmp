import {
  GridColDef,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
} from '@mui/x-data-grid';
import { DisasterType, FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

const getColumnSetup = (field: string, disaster: DisasterType): GridColDef => ({
  field,
  width: 150,
  editable: true,
  renderHeader: (params: GridColumnHeaderParams) => (
    <FormattedMessage id={`table.${disaster}.${params.field}`} />
  ),
});

const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});

export const A1Columns: GridColDef[] = [
  getColumnSetup(FloodSpecific.TNumDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumMeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumFeDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumKidDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumOldDeath, FLOOD),
  getColumnSetup(FloodSpecific.NumDisDeath, FLOOD),
];

export const A1ColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('a1', FLOOD),
    children: [
      {
        ...getGroupSetup('g4', FLOOD),
        children: [
          { field: FloodSpecific.TNumDeath },
          { field: FloodSpecific.NumMeDeath },
          { field: FloodSpecific.NumFeDeath },
          { field: FloodSpecific.NumKidDeath },
          { field: FloodSpecific.NumOldDeath },
          { field: FloodSpecific.NumDisDeath },
        ],
      },
    ],
  },
];
