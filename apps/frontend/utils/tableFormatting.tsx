import { Typography } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  DisasterType,
  FloodSpecific,
  KoboCommonKeys,
} from '@wfp-dmp/interfaces';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CustomToolMenu from './CustomToolMenu';

const sortIconWidth = 27;
const highlightFields = [
  FloodSpecific.NumPeoAff,
  FloodSpecific.NumTDeath,
  FloodSpecific.NumTMissing,
  FloodSpecific.NumTInjure,
];

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
    // TODO: provide type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellClassName: (params: GridCellParams<any, number>) => {
      // TODO: what should be the highlight logic?
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      if (highlightFields.includes(params.field as any))
        return 'highlighted-cell';

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
  getLocationColumnSetup(KoboCommonKeys.province, 85),
  getLocationColumnSetup(KoboCommonKeys.district, 74),
  getLocationColumnSetup(KoboCommonKeys.commune, 76),
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
