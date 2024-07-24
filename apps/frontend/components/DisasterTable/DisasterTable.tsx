/* eslint-disable max-lines */
/* eslint-disable complexity */
import { Box } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnGroupHeaderParams,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
  GridRowModel,
} from '@mui/x-data-grid';
import { sum } from 'lodash';
import React from 'react';

import { colors } from 'theme/muiTheme';
import CustomToolMenu from 'utils/CustomToolMenu';

import ScrollArrows from './ScrollArrows';

export type DisasterTableVariant = 'open' | 'bordered';

export interface DisasterTableProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  isEditable: boolean;
  columnHeaderHeight?: 'normal' | 'large';
  variant: DisasterTableVariant;
  getRowClassName?: DataGridProps['getRowClassName'];
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  getRowId,
  isEditable,
  variant,
  columnHeaderHeight = 'normal',
  getRowClassName,
}: DisasterTableProps): JSX.Element => {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);

  const { scrollWidth, offsetWidth, scrollLeft } = outerRef.current ?? {};

  React.useEffect(() => {
    if (!outerRef.current) {
      return;
    }

    const obs = new ResizeObserver(() => {
      const { scrollWidth: scroll, offsetWidth: offset } =
        outerRef.current ?? {};
      const overflow =
        scroll !== undefined && offset !== undefined && scroll > offset;

      setHasOverflow(overflow);
    });

    obs.observe(outerRef.current);

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

  const hasGroups = columnGroup.length > 0;
  const [groupHead, ...groupRest] = columnGroup;
  const updatedColumnGroup = hasGroups
    ? [
        {
          ...groupHead,
          renderHeaderGroup: (params: GridColumnGroupHeaderParams) => {
            return (
              <>
                {variant === 'open' && <CustomToolMenu />}
                {groupHead.renderHeaderGroup?.(params)}
                {variant === 'bordered' && (
                  <CustomToolMenu withBorder={false} />
                )}
              </>
            );
          },
          headerClassName:
            variant === 'open'
              ? `${
                  groupHead.headerClassName
                    ?.toString()
                    .split(' ')
                    .filter(x => x !== 'header-top-cell')
                    .join(' ') ?? ''
                } header-setting-cell`
              : groupHead.headerClassName,
        },
        ...groupRest,
      ]
    : [];

  // Make location columns non-hideable
  const _updatedColumns = columns.map(column => {
    if (
      ['province', 'district', 'commune', 'location'].includes(column.field)
    ) {
      return {
        ...column,
        hideable: false,
      };
    }

    return column;
  });
  const [columnsHead, ...columnsRest] = _updatedColumns;
  const updatedColumns = !hasGroups
    ? [
        {
          ...columnsHead,
          renderHeader: (params: GridColumnHeaderParams) => (
            <>
              {columnsHead.renderHeader?.(params)}
              <CustomToolMenu withBorder={false} />
            </>
          ),
        },
        ...columnsRest,
      ]
    : _updatedColumns;

  const borderCSS = `1px solid ${colors.gray}`;
  const transparentBorder = '1px solid transparent';
  const showBorder = variant === 'bordered' ? undefined : borderCSS;
  const showTransBorder =
    variant === 'bordered' ? undefined : transparentBorder;
  const disableBorder = variant === 'bordered' ? undefined : 'none';

  const hideBorderDivStyles = {
    minWidth: '2px',
    minHeight: `${columnHeaderHeight === 'large' ? 69 : 49}px`,
    position: 'absolute' as const,
    background: '#f9f7f7',
    zIndex: 1,
  };

  return (
    <Box position="relative">
      <ScrollArrows
        hasOverflow={hasOverflow}
        hovering={hovering}
        scrollWidth={scrollWidth}
        offsetWidth={offsetWidth}
        scrollLeft={scrollLeft}
        outerRef={outerRef}
      />
      <Box
        overflow="scroll"
        ref={outerRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Box
          position="relative"
          width={sum(updatedColumns.map(x => x.width ?? 0))}
          m={2}
          mt={0}
        >
          {columnGroup.length === 1 && variant === 'open' && (
            <div
              style={{
                ...hideBorderDivStyles,
                right: 0,
                top: 0,
              }}
            />
          )}
          {variant === 'open' && (
            <div
              style={{
                ...hideBorderDivStyles,
                left: 0,
                top: 0,
              }}
            />
          )}
          <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeader.empty-group-header': {
                backgroundColor: '#f9f7f7',
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
                borderTop: variant === 'open' ? borderCSS : undefined,
                borderBottom: borderCSS,
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader.header-top-cell.no-border-bottom': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeader.header-setting-cell.no-border-bottom':
                {
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
                borderTop: showBorder,
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
            columnGroupingModel={updatedColumnGroup}
            isCellEditable={() => isEditable}
            processRowUpdate={(newRow: GridRowModel) => {
              if (onChange) onChange(newRow);

              return newRow;
            }}
            getRowId={getRowId}
            getRowClassName={getRowClassName}
            autoHeight
            columnHeaderHeight={columnHeaderHeight === 'large' ? 100 : 72}
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
