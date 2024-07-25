/* eslint-disable max-lines */
import { Typography } from '@mui/material';
import {
  GridColDef,
  GridColumnGroup,
  GridColumnGroupingModel,
  GridColumnHeaderParams,
  GridColumnNode,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { DisasterType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const getColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  width = 72,
  opts: {
    type: 'singleSelect' | 'number';
    valueOptions?: { value: '1' | '2' | ''; label: string }[];
  } = { type: 'number' },
  isSummary = false,
  fontWeight: React.CSSProperties['fontWeight'] = undefined,
  highlightColumn = false,
  // eslint-disable-next-line max-params
): GridColDef => {
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
    renderCell: (params: GridRenderCellParams) => (
      <FormattedMessage id={`${field}.${params.value as string}`} />
    ),
  };
};

const getLocationCountColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  width = 80,
): GridColDef => ({
  field,
  width: width,
  headerAlign: 'center',
  disableColumnMenu: true,
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="body2">
      <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
    </Typography>
  ),
});

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
        children: [...children, ...groupParams.additionalChildren],
      }
    : undefined;

  const newGroups: GridColumnGroupingModel =
    group !== undefined ? [group, ...columnGroup] : columnGroup;

  return newGroups;
};

export interface AddDetailedReportLocationColumnsParams {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  groupParams?: ColumnSetupParams;
}

export const addDetailedReportLocationColumns = ({
  columns,
  columnGroup,
  groupParams,
}: AddDetailedReportLocationColumnsParams) => {
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

export interface AddBriefReportLocationColumnsParams {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  groupParams?: ColumnSetupParams;
}

export const addBriefReportLocationColumns = ({
  columns,
  columnGroup,
  groupParams,
}: AddBriefReportLocationColumnsParams) => {
  const newColumns: GridColDef[] = [
    getLocationColumnSetup(KoboCommonKeys.province, 200),
    getLocationCountColumnSetup(KoboCommonKeys.district, 'COMMON', 72),
    getLocationCountColumnSetup(KoboCommonKeys.commune, 'COMMON', 84),
    ...columns,
  ];

  const newGroups: GridColumnGroupingModel = addGroup(
    columnGroup,
    [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
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
