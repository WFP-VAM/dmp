import {
  FLOOD,
  floodSpecificKeys,
  FloodSpecificType,
} from '@wfp-dmp/interfaces';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';
import { useGetFormConstraints } from 'services/api/kobo/useGetFormConstraints';
import {
  applyFieldConstraints,
  buildFieldBounds,
  getChangedFieldViolation,
} from 'utils/koboConstraints';
import { wrapGroupAsTitle } from 'utils/tableFormatting';

import { useShowFormMessage } from '../FormUpdateError';
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
  const showFormMessage = useShowFormMessage();
  const { data: constraints } = useGetFormConstraints(FLOOD);
  const boundsByField = useMemo(
    () => buildFieldBounds(constraints, floodSpecificKeys),
    [constraints],
  );
  const handleCellCommit = useCallback(
    (newRow: Record<string, unknown>, oldRow: Record<string, unknown>) => {
      const violation = getChangedFieldViolation(newRow, oldRow, boundsByField);
      if (violation !== undefined) {
        showFormMessage(violation.message);
      }
    },
    [boundsByField, showFormMessage],
  );

  return (
    <ReportTablesWrapper>
      {getFloodTablesMapping(intl).map(
        ({ columns, columnGroup, groupParams }, index) => {
          const group = columnGroup;
          const cols = applyFieldConstraints(
            typeof columns === 'function' ? columns(false) : columns,
            constraints,
            floodSpecificKeys,
          );

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
              onCellCommit={handleCellCommit}
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
