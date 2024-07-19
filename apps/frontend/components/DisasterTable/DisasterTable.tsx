import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
} from '@mui/x-data-grid';
import { sum } from 'lodash';
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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);

  console.log({ hovering });

  React.useEffect(() => {
    if (!contentRef.current || !outerRef.current) {
      return;
    }

    const obs = new ResizeObserver(() => {
      const overflow =
        (outerRef.current?.offsetWidth ?? 0) <
        (contentRef.current?.offsetWidth ?? 0);

      setHasOverflow(overflow);
    });

    obs.observe(contentRef.current);

    return () => obs.disconnect();
  }, []);

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

  const borderCSS = `1px solid ${colors.gray}`;
  const transparentBorder = '1px solid transparent';

  const showBorder = border ? undefined : borderCSS;
  const showTransBorder = border ? undefined : transparentBorder;

  const disableBorder = border ? undefined : 'none';

  const arrowStyles = {
    border: `6px solid ${colors.color5}`,
    borderRadius: '12px',
    color: colors.color5,
    position: 'absolute' as const,
    top: '50%',
    zIndex: 1,
    opacity: hovering ? 0 : 1,
    transition: '0.4s',
  };

  return (
    <Box position="relative">
      {hasOverflow && (
        <ArrowRight
          fontSize="large"
          style={{ ...arrowStyles, right: '3rem' }}
        />
      )}
      {hasOverflow && (
        <ArrowLeft fontSize="large" style={{ ...arrowStyles, left: '3rem' }} />
      )}
      <Box
        overflow="scroll"
        ref={outerRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Box
          ref={contentRef}
          width={sum(updatedColumns.map(x => x.width ?? 0))}
          m={2}
          mt={0}
        >
          <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeader.empty-group-header': {
                backgroundColor: '#f9f7f7',
              },
              '& .left-border': {
                borderLeft: borderCSS,
              },
              '& .MuiDataGrid-row.highlight-1': {
                background: `${colors.color1}`,
              },
              '& .MuiDataGrid-row.highlight-2': {
                background: `#D0EBF9`,
              },
              '& .MuiDataGrid-cell.highlighted-cell': {
                background: '#D0EBF9',
              },
              '& .MuiDataGrid-columnHeader.header-top-cell': {
                borderTop: borderCSS,
                borderBottom: borderCSS,
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader.header-top-cell.no-border-bottom': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeader.header-setting-cell': {
                fontWeight: 'bold',
                borderBottom: borderCSS,
                backgroundColor: '#f9f7f7',
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderLeft: showTransBorder,
              },
              '& .MuiDataGrid-row': {
                background: 'white',
                borderLeft: showBorder,
              },
              '& .MuiDataGrid-cell': {
                borderColor: colors.gray,
                whiteSpace: 'normal !important',
                wordWrap: 'break-word !important',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: isEditable ? '' : 'none',
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
              '& .MuiDataGrid-columnHeader--emptyGroup': {
                backgroundColor: '#f9f7f7',
                borderBottom: borderCSS,
                borderTop: borderCSS,
              },
              '& .MuiDataGrid-iconButtonContainer': {
                display: 'none',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                border: 'none !important',
              },
              '& .MuiDataGrid-virtualScroller': {
                overflow: 'unset',
                overflowY: 'unset !important',
              },
              '& .MuiDataGrid-scrollbar': {
                overflow: 'hidden',
              },
              breakInside: 'avoid',
              borderTop: disableBorder,
              borderLeft: disableBorder,
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
        </Box>
      </Box>
    </Box>
  );
};
