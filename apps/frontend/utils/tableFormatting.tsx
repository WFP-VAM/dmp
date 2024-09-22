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
    valueFormatter: value =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      intl.formatMessage({ id: `${field}.${value as string}` }),
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
  type: 'number',
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="body2">
      <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
    </Typography>
  ),
  // For villages, we need to count the number of villages in the list
  ...(field === KoboCommonKeys.village
    ? {
        renderCell: (params: GridRenderCellParams) => {
          const villageList = params.value as string[] | undefined;

          return villageList ? villageList.length : 0;
        },
      }
    : {}),
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
  console.log({ children, addChill: groupParams?.additionalChildren });
  const group: GridColumnGroup | undefined = groupParams
    ? {
        ...getGroupSetup(groupParams.groupId, groupParams.disaster),
        children: [
          ...children,
          // Only add KoboCommonKeys.village if not already present
          ...(children.some(
            child => 'field' in child && child.field === KoboCommonKeys.village,
          )
            ? []
            : [{ field: KoboCommonKeys.village as string } as GridColumnNode]),
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
    getLocationCountColumnSetup(KoboCommonKeys.village as string, 'COMMON', 72),
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
    getLocationCountColumnSetup(KoboCommonKeys.village as string, 'COMMON', 72),
    ...columns,
  ];

  const newGroups: GridColumnGroupingModel = addGroup(
    columnGroup,
    [
      { field: KoboCommonKeys.province },
      { field: KoboCommonKeys.district },
      { field: KoboCommonKeys.commune },
      { field: KoboCommonKeys.village as string },
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
