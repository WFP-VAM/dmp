import { Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
  useGridApiRef,
} from '@mui/x-data-grid';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  isEditable: boolean;
  rotateHeader?: boolean;
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  getRowId,
  isEditable,
  rotateHeader = false,
}: IProps): JSX.Element => {
  const apiRef = useGridApiRef();

  return (
    <>
      {/* TODO - make the province column not hideable */}
      <Button onClick={() => apiRef.current.toggleColumnMenu('province')}>
        Manage Columns
      </Button>    
      <DataGrid
        apiRef={apiRef}
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: isEditable ? '' : 'none',
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal !important',
            wordWrap: 'break-word !important',
          },
          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            whiteSpace: 'normal !important',
            wordWrap: 'break-word !important',
            lineHeight: 'normal',
            ...(rotateHeader && {
              transform: 'rotate(-90deg)',
              minWidth: '180px',
            }),
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f5f8ff',
          },
          mt: 1,
          breakInside: 'avoid',
        }}
        disableRowSelectionOnClick={!isEditable}
        showCellVerticalBorder
        showColumnVerticalBorder
        rows={data}
        columns={columns}
        hideFooter
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroup}
        isCellEditable={() => isEditable}
        processRowUpdate={(newRow: GridRowModel) => {
          if (onChange) onChange(newRow);

          return newRow;
        }}
        getRowId={getRowId}
        autoHeight
        columnHeaderHeight={rotateHeader ? 200 : 75}
        disableVirtualization
      />
    </>
  );
};
