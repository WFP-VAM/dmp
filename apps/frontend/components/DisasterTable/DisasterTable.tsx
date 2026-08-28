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
import {
  getMaxBandContentWidth,
  getPrintScale,
  PRINT_VILLAGE_COLUMN_PRINT_WIDTH,
  shouldUseColumnBands,
  splitColumnsForPrint,
} from 'utils/printLayout';
import { TOTAL_ROW_ID, useAggregatedRow } from 'utils/tableFormatting';

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
  aggregateRowFilter,
  isFirstTable,
}: DisasterTableProps): JSX.Element => {
  const theme = useTheme();
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const isPrinting = usePrintContext();

  const { scrollWidth, offsetWidth, scrollLeft } = outerRef.current ?? {};

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
  const updatedColumnGroup = useMemo(() => {
    if (!hasGroups) {
      return [];
    }

    const withTopCellDef = columnGroup.map(x => ({
      ...x,
      headerClassName: `${x.headerClassName?.toString() ?? ''} header-top-cell`,
    }));
    const [groupHead, ...groupRest] = withTopCellDef;

    return [
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
    ];
  }, [columnGroup, hasGroups, variant]);

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

      if (isPrinting && column.field === 'village') {
        return {
          ...column,
          width: PRINT_VILLAGE_COLUMN_PRINT_WIDTH,
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
  }, [columns, hasGroups, isPrinting]);

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

      // Check if column is visible
      // If the field is not in the model, default to true (visible)
      // If the field is in the model, use its value
      const visibility = columnVisibilityModel[column.field];

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      return visibility !== false; // Only hide if explicitly set to false
    });

    return sum(visibleColumns.map(x => x.width ?? 0)) + 2; // 2px for borders on the sides
  }, [updatedColumns, columnVisibilityModel]);

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
  }, [totalWidth, columnVisibilityModel]);

  const printColumnBands = useMemo(() => {
    const singleBand = {
      columns: updatedColumns,
      columnGroup: updatedColumnGroup,
      width: totalWidth,
    };

    if (!isPrinting) {
      return [singleBand];
    }

    if (shouldUseColumnBands(totalWidth)) {
      return splitColumnsForPrint(
        updatedColumns,
        updatedColumnGroup,
        getMaxBandContentWidth(),
      );
    }

    return [singleBand];
  }, [isPrinting, totalWidth, updatedColumns, updatedColumnGroup]);

  const rowsPerPage = isPrinting ? 25 : extendedData.length;
  const dataChunks = useMemo(() => {
    return isPrinting ? chunk(extendedData, rowsPerPage) : [extendedData];
  }, [isPrinting, extendedData, rowsPerPage]);

  const borderCSS = `1px solid ${colors.gray}`;

  const hideBorderDivStyles = {
    minWidth: '2px',
    minHeight: `${columnHeaderHeight === 'large' ? 69 : 49}px`,
    position: 'absolute' as const,
    background: '#f9f7f7',
    zIndex: 1,
  };

  return (
    <>
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
          {printColumnBands.map((band, bandIndex) =>
            dataChunks.map((chunkOfRows, chunkIndex) => {
              const bandFields = new Set(
                band.columns.map(column => column.field),
              );
              const bandExtendedColumns = extendedColumns.filter(column =>
                bandFields.has(column.field),
              );
              const bandRows =
                bandIndex > 0
                  ? chunkOfRows.filter(
                      row => extendedGetRowId(row) !== TOTAL_ROW_ID,
                    )
                  : chunkOfRows;
              const scaleFactor = isPrinting ? getPrintScale(band.width) : 1;
              // Hard page break only for additional column bands or row chunks.
              // Short themed tables flow naturally; category (disaster type)
              // breaks are handled at the report level.
              const needsPageBreak = bandIndex > 0 || chunkIndex > 0;
              const printTopPadding =
                isFirstTable === false || needsPageBreak ? '2rem' : 0;

              return (
                <React.Fragment key={`${bandIndex}-${chunkIndex}`}>
                  {needsPageBreak && <Box sx={{ pageBreakBefore: 'always' }} />}
                  <Stack
                    direction="row"
                    position="relative"
                    sx={{
                      m: 2,
                      mt: 0,
                      '@media print': {
                        m: 0,
                        pl: '2rem',
                        pt: printTopPadding,
                        breakInside: 'avoid',
                        pageBreakInside: 'avoid',
                      },
                    }}
                  >
                    {/* Adds padding for printing */}
                    <Box
                      sx={{
                        '@media print': {
                          minHeight: theme.spacing(4),
                        },
                      }}
                    />
                    {(band.columnGroup.length === 1 ||
                      !isLastCovered(
                        band.columnGroup,
                        band.columns[band.columns.length - 1].field,
                      )) &&
                      variant === 'open' && (
                        <Box
                          sx={{
                            ...hideBorderDivStyles,
                            right: 0,
                            top: 0,
                            '@media print': {
                              right: 0,
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
                            left: 0,
                          },
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        width: band.width,
                        minWidth: band.width,
                        '@media print': {
                          zoom: scaleFactor,
                        },
                      }}
                    >
                      <DataGrid
                        sx={{
                          '@media print': {
                            '& .MuiDataGrid-columnHeader': {
                              fontSize: '0.65rem',
                              padding: '4px 0px 4px 4px',
                            },
                            '& .MuiDataGrid-cell': {
                              fontSize: '0.7rem',
                              padding: '4px',
                            },
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
                            borderTop:
                              variant === 'open' ? borderCSS : undefined,
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
                          '& .MuiDataGrid-columnHeader--filledGroup:focus-within':
                            {
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
                          borderTop:
                            variant === 'bordered' ? undefined : 'none',
                          borderColor: colors.gray,
                          '& .MuiDataGrid-cell:focus-within': {
                            outline: 'solid green 3px',
                            outlineWidth: '3px',
                            outlineOffset: '-3px',
                            zIndex: 2,
                            position: 'relative',
                          },
                        }}
                        disableColumnResize
                        density="compact"
                        disableRowSelectionOnClick={!isEditable}
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        hideFooter
                        rows={bandRows}
                        columns={bandExtendedColumns}
                        columnGroupingModel={band.columnGroup}
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
                          minHeight: '100%',
                        },
                      }}
                    />
                  </Stack>
                </React.Fragment>
              );
            }),
          )}
        </Box>
      </Box>
    </>
  );
};
