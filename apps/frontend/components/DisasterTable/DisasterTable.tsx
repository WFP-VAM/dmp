import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  // Generate column visibility model and hide empty columns by default.
  const generateColumnVisibilityModel = (
    inputColumns: GridColDef[],
    inputData: Record<string, string | number | undefined>[],
  ) => {
    return inputColumns.reduce((acc, column) => {
      const columnId = column.field;
      const isColumnVisible = inputData.some(
        row => row[columnId] !== undefined,
      );
      acc[columnId] = isColumnVisible;

      return acc;
    }, {} as Record<string, boolean>);
  };

  const columnVisibilityModel = generateColumnVisibilityModel(columns, data);
  const updatedColumns = columns.map((column, index) => ({
    ...column,
    ...(index === 0 && {
      hideable: false,
      width: 150,
      renderHeader: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => {
                apiRef.current.showColumnMenu('province');
              }}
              style={{
                minWidth: '24px',
                minHeight: '24px',
                padding: '0',
                borderRadius: '4px',
                border: '1px solid #d3d3d3',
                backgroundColor: '#f5f5f5',
                marginRight: '4px',
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                style={{ color: '#000', fontSize: '16px' }}
              />
            </Button>
            {/* eslint-disable-next-line */}
            {column.renderHeader?.(column as any)}
          </div>
        );
      },
    }),
  }));

  return (
    <>
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
          '& .MuiDataGrid-menuIcon': {
            display: 'none',
          },
          mt: 1,
          breakInside: 'avoid',
        }}
        disableRowSelectionOnClick={!isEditable}
        showCellVerticalBorder
        showColumnVerticalBorder
        rows={data}
        columns={updatedColumns}
        hideFooter
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
        initialState={{
          columns: {
            columnVisibilityModel,
          },
        }}
      />
    </>
  );
};
