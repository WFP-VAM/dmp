import { Stack, useTheme } from '@mui/material';
import { FloodSpecificType } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import { wrapGroupAsTitle } from 'utils/tableFormatting';

import { getFloodTablesMapping } from './floodTablesMapping';

interface IProps {
  value: FloodSpecificType;
  onChange: (event: FloodSpecificType) => void;
  isEditMode: boolean;
}

export const FloodTables = ({
  value,
  onChange,
  isEditMode,
}: IProps): JSX.Element => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {getFloodTablesMapping(intl).map(
        ({ columns, columnGroup, groupParams }, index) => {
          const group = columnGroup;
          const cols = typeof columns === 'function' ? columns(false) : columns;

          return (
            <DisasterTable
              columns={cols}
              columnGroup={
                groupParams
                  ? wrapGroupAsTitle({
                      columns: cols,
                      columnGroup: group,
                      groupParams,
                    })
                  : group
              }
              data={[{ id: 1, ...value }]}
              onChange={onChange}
              isEditable={isEditMode}
              key={index}
              variant="open"
            />
          );
        },
      )}
    </Stack>
  );
};
