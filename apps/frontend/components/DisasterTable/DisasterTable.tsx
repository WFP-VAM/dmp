import { useTheme } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
} from '@mui/x-data-grid';

import { colors } from 'theme/muiTheme';

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
  const theme = useTheme();

  return (
    <DataGrid
      sx={{
        '& .highlighted-cell': {
          background: '#D0EBF9 !important',
        },
        // TODO: figure out why this does not work
        '& .header-top-cell': {
          borderTopWidth: '1px !important',
          borderRightStyle: 'solid !important',
        },
        '& .header-setting-cell': {
          fontWeight: 'bold',
          backgroundColor: 'transparent !important',
        },
        '& .MuiDataGrid-cell:focus': {
          outline: isEditable ? '' : 'none',
        },
        '& .MuiDataGrid-cell': {
          background: 'white',
          borderColor: colors.gray,
          whiteSpace: 'normal !important',
          wordWrap: 'break-word !important',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'space-between !important',
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
          padding: '6px 8px',
          borderColor: colors.gray,
          backgroundColor: '#f1f1f1',
        },
        '& .MuiDataGrid-iconButtonContainer': {
          width: '28px !important',
        },
        mt: 1,
        breakInside: 'avoid',
        paddingTop: theme.spacing(4),
        border: 'none',
      }}
      density="compact"
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
  );
};
