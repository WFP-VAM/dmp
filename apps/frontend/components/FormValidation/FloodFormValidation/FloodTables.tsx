import { FloodSpecificType } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';
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

  return (
    <ReportTablesWrapper>
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
    </ReportTablesWrapper>
  );
};
