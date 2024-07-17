import { Typography } from '@mui/material';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { DisasterType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CustomToolMenu from './CustomToolMenu';

const sortIconWidth = 27;
// const highlightFields = [
//   FloodSpecific.NumPeoAff,
//   FloodSpecific.NumTDeath,
//   FloodSpecific.NumTMissing,
//   FloodSpecific.NumTInjure,
// ];

export const getColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  minWidth = 80,
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
    minWidth: minWidth + sortIconWidth,
    flex: 1,
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
    width: width + sortIconWidth,
    editable: true,
    headerAlign: 'left',
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="body2">
        {void console.log({ params })}
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
  width: width + sortIconWidth,
  headerAlign: 'center',
  disableColumnMenu: true,
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="body2">
      <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
    </Typography>
  ),
});

export const getGroupSetup = (
  groupId: string,
  disaster: DisasterType,
  showMenu = false,
) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <>
      {showMenu && <CustomToolMenu />}
      <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
    </>
  ),
});

export const addDetailedReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: KoboCommonKeys.location,
    editable: true,
    width: 300,
    headerAlign: 'left',
    disableColumnMenu: true,
    valueGetter: (_, row) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      return `${row.province}-${row.district}-${row.commune}`;
    },
    renderHeader: (params: GridColumnHeaderParams) => (
      <Typography variant="body2">
        {void console.log({ params })}
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

export const addBriefReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  getLocationColumnSetup(KoboCommonKeys.province, 200),
  getLocationCountColumnSetup(KoboCommonKeys.district, 'COMMON', 56),
  getLocationCountColumnSetup(KoboCommonKeys.commune, 'COMMON', 56),
  ...columns,
];
