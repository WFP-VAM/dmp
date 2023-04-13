import { GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { DisasterType } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const getColumnSetup = (
  field: string,
  disaster: DisasterType,
  width = 90,
  opts?: {
    type: 'singleSelect';
    valueOptions: { value: string; label: string }[];
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

export const getGroupSetup = (groupId: string, disaster: DisasterType) => ({
  groupId: groupId,
  renderHeaderGroup: () => (
    <FormattedMessage id={`table.${disaster}.groupId.${groupId}`} />
  ),
});
