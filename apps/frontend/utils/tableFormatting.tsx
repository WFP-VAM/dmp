import { GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { DisasterType } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const getColumnSetup = (
  field: string,
  disaster: DisasterType,
): GridColDef => ({
  field,
  width: 150,
  editable: true,
  renderHeader: (params: GridColumnHeaderParams) => (
    <FormattedMessage id={`table.${disaster}.column.${params.field}`} />
  ),
});

export const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});