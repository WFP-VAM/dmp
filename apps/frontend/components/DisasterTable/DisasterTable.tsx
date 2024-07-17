import { Stack, useTheme } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
} from '@mui/x-data-grid';
import React from 'react';

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
  columnHeaderHeight?: number;
  border?: boolean;
  getRowClassName?: DataGridProps['getRowClassName'];
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  getRowId,
  isEditable,
  columnHeaderHeight = 72,
  border = true,
  getRowClassName,
}: IProps): JSX.Element => {
  const theme = useTheme();

  // Generate column visibility model and hide empty columns by default.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // TODO - activate column visibility model when PR is stable
  const columnVisibilityModel = {}; // generateColumnVisibilityModel(columns, data);

  // Make province, district, commune columns not hideable
  const updatedColumns = columns.map(column => {
    if (['province', 'district', 'commune'].includes(column.field)) {
      return {
        ...column,
        hideable: false,
      };
    }

    return column;
  });

  return (
    <Stack gap={theme.spacing(4)}>
      <DataGrid
        sx={{
          '& .highlight-1': { background: `${colors.color1} !important` },
          '& .highlight-2': { background: `#D0EBF9 !important` },
          '& .highlighted-cell': {
            background: '#D0EBF9 !important',
          },
          '& .header-top-cell': {
            borderTop: `1px solid ${colors.gray}`,
            borderBottom: `1px solid ${colors.gray}`,
          },
          '& .header-setting-cell': {
            fontWeight: 'bold',
            borderBottom: `1px solid ${colors.gray}`,
            backgroundColor: '#f9f7f7 !important',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: isEditable ? '' : 'none',
          },
          '& .MuiDataGrid-row': {
            background: 'white',
          },
          '& .MuiDataGrid-cell': {
            borderColor: colors.gray,
            whiteSpace: 'normal !important',
            wordWrap: 'break-word !important',
          },
          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            whiteSpace: 'normal !important',
            wordWrap: 'break-word !important',
            lineHeight: 'normal',
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '6px 8px',
            borderColor: colors.gray,
            backgroundColor: '#f1f1f1',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            border: 'none !important',
          },
          breakInside: 'avoid',
          borderTop: border ? undefined : 'none',
          borderLeft: border ? undefined : 'none',
          borderRight: border ? undefined : 'none',
          borderColor: colors.gray,
        }}
        disableColumnResize
        density="compact"
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
        getRowClassName={getRowClassName}
        autoHeight
        columnHeaderHeight={columnHeaderHeight}
        disableVirtualization
        initialState={{
          columns: {
            columnVisibilityModel,
          },
        }}
      />
    </Stack>
  );
};
