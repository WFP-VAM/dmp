import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { DisasterType, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const getColumnSetup = (
  field: string,
  disaster: DisasterType | 'COMMON',
  width = 80,
  opts?: {
    type: 'singleSelect';
    valueOptions: { value: '1' | '2' | ''; label: string }[];
  },
): GridColDef => {
  const fields = {
    field,
    width,
    editable: true,

    renderHeader: (params: GridColumnHeaderParams) => (
      <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
    ),
  };

  return { ...fields, ...opts };
};

export const getLocationColumnSetup = (
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
    renderHeader: (params: GridColumnHeaderParams) => (
      <FormattedMessage id={`forms_table.headers.${params.field}`} />
    ),
    renderCell: (params: GridRenderCellParams) => (
      <FormattedMessage id={`${field}.${params.value as string}`} />
    ),
  };
};

export const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});

export const addDetailedReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  getLocationColumnSetup(KoboCommonKeys.province),
  getLocationColumnSetup(KoboCommonKeys.district),
  getLocationColumnSetup(KoboCommonKeys.commune),
  ...columns,
];

export const addBriefReportLocationColumns = (
  columns: GridColDef[],
): GridColDef[] => [
  getLocationColumnSetup(KoboCommonKeys.province),
  getColumnSetup(KoboCommonKeys.district, 'COMMON', 60),
  getColumnSetup(KoboCommonKeys.commune, 'COMMON', 78),
  ...columns,
];
