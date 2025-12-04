/* eslint-disable max-lines */
/* eslint-disable complexity */
import { Box, Stack, useTheme } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnGroupHeaderParams,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
  GridColumnNode,
  GridRowModel,
  isLeaf,
} from '@mui/x-data-grid';
import { chunk, sum } from 'lodash';
import React, { useMemo } from 'react';

import { usePrintContext } from 'components/PrintWrapper/PrintWrapper';
import { colors } from 'theme/muiTheme';
import CustomToolMenu from 'utils/CustomToolMenu';
import { useAggregatedRow } from 'utils/tableFormatting';

import ScrollArrows from './ScrollArrows';

const isLastCovered = (group: GridColumnNode[], field: string): boolean => {
  for (let index = 0; index < group.length; index++) {
    const element = group[index];

    if (isLeaf(element)) {
      if (element.field === field) return true;
      continue;
    }

    if (isLastCovered(element.children, field)) {
      return true;
    }
  }

  return false;
};

export type DisasterTableVariant = 'open' | 'bordered';

export interface DisasterTableProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | string[] | number | undefined>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  isEditable: boolean;
  columnHeaderHeight?: 'normal' | 'large';
  variant: DisasterTableVariant;
  getRowClassName?: DataGridProps['getRowClassName'];
  isFirstTable?: boolean;
  aggregateRowFilter?: (
    row: Record<string, string | string[] | number | undefined>,
  ) => boolean;
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  getRowId,
  isEditable,
  variant,
  columnHeaderHeight = 'large',
  getRowClassName,
  isFirstTable = true,
  aggregateRowFilter,
}: DisasterTableProps): JSX.Element => {
  const theme = useTheme();
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const isPrinting = usePrintContext();

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

  // TODO - Activate column and data filtering
  // This has implications on the print mechanism as well as the
  // form EDIT page. We also need to confirm that this is wanted by the users.

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

  // Use state to track column visibility so it persists when user hides/shows columns
  // Initialize with all columns visible (empty object means all visible in DataGrid)
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<
    Record<string, boolean>
  >({});

  const nonEmptyData = data;
  // isEditable
  //   ? data
  //   : data.filter(row =>
  //       columns.some(column => {
  //         const value = row[column.field];

  //         return value !== undefined && value !== '';
  //       }),
  //     );

  const hasGroups = columnGroup.length > 0;
  const withTopCellDef = columnGroup.map(x => ({
    ...x,
    headerClassName: `${x.headerClassName?.toString() ?? ''} header-top-cell`,
  }));
  const [groupHead, ...groupRest] = withTopCellDef;
  const updatedColumnGroup = hasGroups
    ? [
        {
          ...groupHead,
          renderHeaderGroup: (params: GridColumnGroupHeaderParams) => {
            return (
              <>
                {groupHead.renderHeaderGroup?.(params)}

                <CustomToolMenu withBorder={false} />
              </>
            );
          },
          headerClassName:
            variant === 'open'
              ? `${groupHead.headerClassName
                  .toString()
                  .split(' ')
                  .filter(x => x !== 'header-top-cell')
                  .join(' ')} header-setting-cell`
              : groupHead.headerClassName,
        },
        ...groupRest,
      ]
    : [];

  // Make location columns non-hideable
  const updatedColumns = useMemo(() => {
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

    if (!hasGroups) {
      const [columnsHead, ...columnsRest] = _updatedColumns;

      return [
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
      ];
    }

    return _updatedColumns;
  }, [columns, hasGroups]);

  const {
    data: extendedData,
    columns: extendedColumns,
    getRowId: extendedGetRowId,
    getRowClassName: extendedGetRowClassName,
  } = useAggregatedRow({
    data: nonEmptyData,
    columns: updatedColumns,
    getRowId,
    getRowClassName,
    rowFilter: aggregateRowFilter,
  });

  // Calculate width based on visible columns only
  const totalWidth = useMemo(() => {
    const visibleColumns = updatedColumns.filter(column => {
      // If columnVisibilityModel is empty, all columns are visible
      if (Object.keys(columnVisibilityModel).length === 0) {
        return true;
      }

      // Check if column is visible (defaults to true if not in model)
      return columnVisibilityModel[column.field];
    });

    return sum(visibleColumns.map(x => x.width ?? 0)) + 2; // 2px for borders on the sides
  }, [updatedColumns, columnVisibilityModel]);
  const maxPrintWidth = 1600; // Maximum print width in pixels
  const scaleFactor = Math.min(1, maxPrintWidth / totalWidth);

  const borderCSS = `1px solid ${colors.gray}`;

  const hideBorderDivStyles = {
    minWidth: '2px',
    minHeight: `${columnHeaderHeight === 'large' ? 69 : 49}px`,
    position: 'absolute' as const,
    background: '#f9f7f7',
    zIndex: 1,
  };

  const rowsPerPage = Math.floor(28 / scaleFactor);
  const dataChunks = useMemo(() => {
    return isPrinting ? chunk(extendedData, rowsPerPage) : [extendedData];
  }, [isPrinting, extendedData, rowsPerPage]);

  return (
    <>
      {/* Add page break before additional tables */}
      {!isFirstTable && isPrinting && (
        <Box sx={{ pageBreakBefore: 'always', height: '0px' }} />
      )}
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
          ref={outerRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          sx={{
            overflow: 'scroll',
            '@media print': {
              overflow: 'visible',
            },
          }}
        >
          {dataChunks.map((chunkOfRows, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Box sx={{ pageBreakBefore: 'always', height: '20px' }} />
              )}
              <Stack direction="row" position="relative" m={2} mt={0}>
                {/* Adds padding for printing */}
                <Box
                  sx={{
                    '@media print': {
                      minWidth: '2rem',
                      minHeight: theme.spacing(4),
                    },
                  }}
                />
                {(updatedColumnGroup.length === 1 ||
                  !isLastCovered(
                    updatedColumnGroup,
                    updatedColumns[updatedColumns.length - 1].field,
                  )) &&
                  variant === 'open' && (
                    <Box
                      sx={{
                        ...hideBorderDivStyles,
                        right: 0,
                        top: 0,
                        '@media print': {
                          right: '2rem',
                        },
                      }}
                    />
                  )}
                {variant === 'open' && (
                  <Box
                    sx={{
                      ...hideBorderDivStyles,
                      left: 0,
                      top: 0,
                      '@media print': {
                        left: '2rem',
                      },
                    }}
                  />
                )}
                <Box sx={{ width: totalWidth, maxWidth: totalWidth }}>
                  <DataGrid
                    sx={{
                      '@media print': {
                        zoom: scaleFactor,
                      },
                      '& .MuiDataGrid-row.highlight-1': {
                        background: `${colors.color1}`,
                      },
                      '& .MuiDataGrid-row.highlight-2': {
                        background: `#D0EBF9`,
                      },
                      '& .MuiDataGrid-row.total-row': {
                        fontWeight: 700,
                      },
                      '& .MuiDataGrid-cell.highlighted-cell': {
                        background: '#D0EBF9',
                      },
                      '& .MuiDataGrid-columnHeader.header-top-cell': {
                        borderTop: variant === 'open' ? borderCSS : undefined,
                      },
                      '& .MuiDataGrid-columnHeader.header-setting-cell': {
                        fontWeight: 'bold',
                        backgroundColor: '#f9f7f7',
                        outline: 'none',
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
                        padding: '8px 0px 8px 6px',
                        borderColor: colors.gray,
                        backgroundColor: '#f1f1f1',
                      },
                      '& .MuiDataGrid-columnHeader--emptyGroup': {
                        backgroundColor: '#f9f7f7',
                        borderBottom: borderCSS,
                      },
                      '& .MuiDataGrid-iconButtonContainer': {
                        display: 'none',
                      },
                      '& .MuiDataGrid-columnHeader--filledGroup': {
                        borderBottom: borderCSS,
                      },
                      '& .MuiDataGrid-columnHeader--filledGroup:focus-within': {
                        outline: 'none',
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
                      borderTop: variant === 'bordered' ? undefined : 'none',
                      borderColor: colors.gray,
                      '& .MuiDataGrid-cell:focus-within': {
                        outline: 'solid green 3px',
                        outlineWidth: '3px',
                        outlineOffset: '-3px',
                      },
                    }}
                    disableColumnResize
                    density="compact"
                    disableRowSelectionOnClick={!isEditable}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    hideFooter
                    rows={chunkOfRows}
                    columns={extendedColumns}
                    columnGroupingModel={updatedColumnGroup}
                    isCellEditable={() => isEditable}
                    processRowUpdate={(newRow: GridRowModel) => {
                      if (onChange) onChange(newRow);

                      return newRow;
                    }}
                    getRowId={extendedGetRowId}
                    getRowClassName={extendedGetRowClassName}
                    autoHeight
                    columnHeaderHeight={
                      columnHeaderHeight === 'large' ? 100 : 72
                    }
                    disableVirtualization
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={newModel => {
                      setColumnVisibilityModel(newModel);
                    }}
                  />
                </Box>
                {/* Adds padding for printing */}
                <Box
                  sx={{
                    '@media print': {
                      minWidth: '2rem',
                      minHeight: '100%',
                    },
                  }}
                />
              </Stack>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
  );
};
