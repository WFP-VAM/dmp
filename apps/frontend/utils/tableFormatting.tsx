/* eslint-disable max-lines */
import { Tooltip, Typography } from '@mui/material';
import {
  GridColDef,
  GridColumnGroup,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
  GridColumnNode,
  GridComparatorFn,
  GridRenderCellParams,
  GridRowClassNameParams,
  GridSortDirection,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid';
import { DisasterType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface GetColumnSetupParams {
  field: string;
  disaster: DisasterType | 'COMMON';
  width?: number;
  opts?: {
    type: 'singleSelect' | 'number';
    valueOptions?: { value: '1' | '2' | ''; label: string }[];
  };
  isSummary?: boolean;
  fontWeight?: React.CSSProperties['fontWeight'];
  highlightColumn?: boolean;
}

export const getColumnSetup = ({
  field,
  disaster,
  width = 72,
  opts = { type: 'number' },
  isSummary = false,
  fontWeight = undefined,
  highlightColumn = false,
}: GetColumnSetupParams): GridColDef => {
  const fields = {
    field,
    width,
    editable: true,
    headerAlign: 'center',
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="body2" textAlign="center" fontWeight={fontWeight}>
        <FormattedMessage
          id={`table.${disaster}.${isSummary ? 'summary_' : ''}column.${
            params.field
          }`}
        />
      </Typography>
    ),
    cellClassName: () => {
      // TODO: what should be the highlight logic?
      if (highlightColumn) return 'highlighted-cell';

      return '';
    },
    // cast the modified value from number to string to stay consistent with Kobo
    valueParser: (value: string | number | undefined) => {
      return value === undefined ? undefined : String(value);
    },
  } as const;

  return { ...fields, ...opts };
};

const getLocationColumnSetup = (
  field:
    | KoboCommonKeys.province
    | KoboCommonKeys.district
    | KoboCommonKeys.commune,
  width = 90,
): GridColDef => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  return {
    field,
    width,
    editable: true,
    headerAlign: 'left',
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="body2">
        <FormattedMessage id={`forms_table.headers.${params.field}`} />
      </Typography>
    ),
    valueGetter: value =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      intl.formatMessage({ id: `${field}.${value as string}` }),
  };
};

const getLocationCountColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  width = 80,
): GridColDef => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  return {
    field,
    width: width,
    headerAlign: 'center',
    disableColumnMenu: true,
    type: 'number',
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="body2">
        <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
      </Typography>
    ),
    // For villages, we need to count the number of villages in the list and display
    // all villages in the tooltip
    ...(field === KoboCommonKeys.village
      ? {
          valueGetter: value => {
            const villageList = value as string[] | undefined;
            const formattedList = villageList
              ?.map(village =>
                intl.formatMessage({ id: `${field}.${village}` }),
              )
              .sort((a, b) => a.localeCompare(b, intl.locale)); // Sort alphabetically

            return formattedList ?? [];
          },
          renderCell: (params: GridRenderCellParams) => {
            const displayLabel = (params.value as string[]).join(', ');

            return (
              <Tooltip title={displayLabel} arrow>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                  }}
                >
                  {displayLabel}
                </div>
              </Tooltip>
            );
          },
          sortComparator: (v1, v2) => {
            const v1List = v1 as string[];
            const v2List = v2 as string[];

            return v1List.length - v2List.length;
          },
        }
      : {}),
  };
};

export const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});

const addGroup = (
  columnGroup: GridColumnGroupingModel,
  children: GridColumnNode[],
  groupParams?: ColumnSetupParams,
) => {
  const group: GridColumnGroup | undefined = groupParams
    ? {
        ...getGroupSetup(groupParams.groupId, groupParams.disaster),
        children: [
          ...children,
          // TODO - this is a hack to add village to the commune level report without
          // breaking the grouped menu in detailed commune level report
          // Only add KoboCommonKeys.village if not already present
          ...(children.some(
            child => 'field' in child && child.field === KoboCommonKeys.village,
          )
            ? []
            : [{ field: KoboCommonKeys.village }]),
          ...groupParams.additionalChildren,
        ],
      }
    : undefined;

  const newGroups: GridColumnGroupingModel =
    group !== undefined ? [group, ...columnGroup] : columnGroup;

  return newGroups;
};

interface AddCommuneLevelReportLocationColumnsParams {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  groupParams?: ColumnSetupParams;
}

export const addCommuneLevelReportLocationColumns = ({
  columns,
  columnGroup,
  groupParams,
}: AddCommuneLevelReportLocationColumnsParams) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  const newColumns: GridColDef[] = [
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      field: KoboCommonKeys.location,
      editable: true,
      width: 300,
      headerAlign: 'left',
      disableColumnMenu: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueGetter: (_: any, row: any) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        return `${row.province}-${row.district}-${row.commune}`;
      },
      valueFormatter: value => {
        const [province, district, commune] = (value as string)
          .split('-')
          .map(x => (x === 'undefined' ? undefined : x));

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
        const location = commune || district || province;
        const key =
          commune !== undefined
            ? KoboCommonKeys.commune
            : district !== undefined
            ? KoboCommonKeys.district
            : KoboCommonKeys.province;

        return intl.formatMessage({ id: `${key}.${location as string}` });
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography variant="body2">
          <FormattedMessage id={`forms_table.headers.${params.field}`} />
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => {
        const [province, district, commune] = (params.value as string)
          .split('-')
          .map(x => (x === 'undefined' ? undefined : x));

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
        const location = commune || district || province;

        const key =
          commune !== undefined
            ? KoboCommonKeys.commune
            : district !== undefined
            ? KoboCommonKeys.district
            : KoboCommonKeys.province;

        return (
          <>
            {commune !== undefined && <span>&nbsp;&nbsp;</span>}
            <FormattedMessage id={`${key}.${location as string}`} />
          </>
        );
      },
    },
    // What to do in detailed commune level report?
    getLocationCountColumnSetup(KoboCommonKeys.village, 'COMMON', 300),
    ...columns,
  ];

  const newGroups: GridColumnGroupingModel = addGroup(
    columnGroup,
    [{ field: KoboCommonKeys.location }],
    groupParams,
  );

  return { columns: newColumns, columnGroup: newGroups };
};

export interface ColumnSetupParams {
  groupId: string;
  disaster: DisasterType;
  additionalChildren: GridColumnNode[];
}

export interface AddProvinceLevelReportLocationColumnsParams {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  groupParams?: ColumnSetupParams;
}

export const addProvinceLevelReportLocationColumns = ({
  columns,
  columnGroup,
  groupParams,
}: AddProvinceLevelReportLocationColumnsParams) => {
  const newColumns: GridColDef[] = [
    getLocationColumnSetup(KoboCommonKeys.province, 200),
    getLocationCountColumnSetup(KoboCommonKeys.district, 'COMMON', 72),
    getLocationCountColumnSetup(KoboCommonKeys.commune, 'COMMON', 84),
    getLocationCountColumnSetup(KoboCommonKeys.village, 'COMMON', 300),
    ...columns,
  ];

  const newGroups: GridColumnGroupingModel = addGroup(
    columnGroup,
    [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
      { field: KoboCommonKeys.village },
    ],
    groupParams,
  );

  return { columns: newColumns, columnGroup: newGroups };
};

interface WrapGroupAsTitleProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  groupParams: ColumnSetupParams;
}

export const wrapGroupAsTitle = ({
  columns,
  columnGroup,
  groupParams,
}: WrapGroupAsTitleProps): GridColumnGroupingModel => {
  if (columnGroup.length > 0) {
    return [
      {
        ...getGroupSetup(groupParams.groupId, groupParams.disaster),
        children: [...groupParams.additionalChildren, ...columnGroup],
      },
    ];
  }

  const children = columns.map(x => ({ field: x.field }));

  return [
    {
      ...getGroupSetup(groupParams.groupId, groupParams.disaster),
      children,
    },
  ];
};

export const TOTAL_ROW_ID = 'total-row';

/**
 * Add an aggregated row with the sum of the values.
 * It configures the table to keep the total row on top & highlight it
 * Pass the returned properties to the DataGrid component
 */
export const useAggregatedRow = <
  R extends Record<string, unknown> = Record<
    string,
    string | number | undefined
  >,
>(
  data: R[],
  columns: GridColDef[],
  getRowId?: (row: R) => string,
  getRowClassName?: (params: GridRowClassNameParams<R>) => string,
) => {
  const intl = useIntl();

  const aggregatedRow = data.reduce<Record<string, string | number | string[]>>(
    (acc, row) => {
      columns.forEach(({ type, field }) => {
        if (field === KoboCommonKeys.village) {
          acc[field] = ((acc[field] as string[] | undefined) ?? []).concat(
            (row[field] as string | undefined) ?? [],
          );
        } else if (type === 'number') {
          acc[field] =
            ((acc[field] as number | undefined) ?? 0) + Number(row[field] ?? 0);
        }
      });

      return acc;
    },
    { id: TOTAL_ROW_ID },
  );

  aggregatedRow[KoboCommonKeys.village] = Array.from(
    new Set(aggregatedRow[KoboCommonKeys.village] as string[]),
  );

  // Update column add custofromm comparator to keep total on top & override first column cell
  const updatedColumns = columns.map((col, i) => ({
    ...col,
    getSortComparator: getTotalRowComparatorFactory(col.sortComparator),
    ...(i === 0 && {
      renderCell: (params: GridRenderCellParams<R>) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        params.id === TOTAL_ROW_ID
          ? intl.formatMessage({ id: 'table.COMMON.total' })
          : col.renderCell?.(params) ?? params.value,
    }),
  }));

  const updatedGetRowId = (row: R) =>
    row.id === TOTAL_ROW_ID ? TOTAL_ROW_ID : getRowId?.(row) ?? '';
  const updatedGetRowClassName = (params: GridRowClassNameParams<R>) =>
    params.id === TOTAL_ROW_ID ? 'total-row' : getRowClassName?.(params) ?? '';

  return {
    data: [aggregatedRow, ...data],
    columns: updatedColumns,
    getRowId: updatedGetRowId,
    getRowClassName: updatedGetRowClassName,
  };
};

const getTotalRowComparatorFactory =
  (customComparator?: GridComparatorFn) =>
  (sortDirection: GridSortDirection): GridComparatorFn =>
  (v1, v2, param1, param2) => {
    const modifier = sortDirection === 'desc' ? -1 : 1;
    if (param1.id === TOTAL_ROW_ID) {
      return -1;
    }
    if (param2.id === TOTAL_ROW_ID) {
      return 1;
    }

    if (customComparator) {
      return modifier * customComparator(v1, v2, param1, param2);
    }

    return modifier * gridStringOrNumberComparator(v1, v2, param1, param2);
  };
