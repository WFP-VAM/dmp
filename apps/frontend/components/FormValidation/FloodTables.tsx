import {
  DataGrid,
  GridColDef,
  GridColumnGroupHeaderParams,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
  GridRowModel,
} from '@mui/x-data-grid';
import { FormattedMessage } from 'react-intl';

const columns: GridColDef[] = [
  {
    field: 'g3/g4/TNumDeath',
    headerName: 'TNumDeath Name',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        <strong>{params.field}</strong>
        <FormattedMessage id="validation_search_params.disaster_type" />
      </>
    ),
  },
  {
    field: 'g3/g4/NumMeDeath',
    headerName: 'NumMeDeath Name',
    width: 150,
  },
  {
    field: 'g3/g4/NumFeDeath',
    headerName: 'NumFeDeath Name',
    width: 150,
    editable: true,
  },
  {
    field: 'g3/g5/NumTMising',
    headerName: 'NumTMising Name',
    width: 150,
    editable: true,
  },
];

const columnGroup: GridColumnGroupingModel = [
  {
    groupId: 'g3my-unique-key',
    children: [
      {
        groupId: 'g4',
        children: [
          { field: 'g3/g4/TNumDeath' },
          { field: 'g3/g4/NumMeDeath' },
          { field: 'g3/g4/NumFeDeath' },
        ],
      },
      {
        groupId: 'g5',
        renderHeaderGroup: (params: GridColumnGroupHeaderParams) => (
          <>
            <strong>{params.groupId}</strong>
            <FormattedMessage id="validation_search_params.disaster_type" />
          </>
        ),
        children: [{ field: 'g3/g5/NumTMising' }],
      },
    ],
  },
];

export interface A1 {
  'g3/g4/TNumDeath'?: string;
  'g3/g4/NumMeDeath'?: string;
  'g3/g4/NumFeDeath'?: string;
  'g3/g5/NumTMising'?: string;
}

interface IProps {
  value: A1;
  onChange: (event: A1) => void;
}

export const A1FloodTable = ({ value, onChange }: IProps): JSX.Element => {
  console;

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={[{ id: 1, ...value }]}
        columns={columns}
        hideFooter
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroup}
        isCellEditable={() => true}
        processRowUpdate={async (newRow: GridRowModel) => {
          onChange(newRow);
          console.log('IN Update', newRow);

          return Promise.resolve(newRow);
        }}
      />
    </div>
  );
};
