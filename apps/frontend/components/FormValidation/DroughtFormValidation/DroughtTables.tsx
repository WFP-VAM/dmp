import { DROUGHT, droughtSpecificKeys } from '@wfp-dmp/interfaces';
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
import { getDroughtTablesMapping } from './droughtTablesMapping';

export type DroughtSpecificType = Record<
  keyof typeof droughtSpecificKeys,
  string | undefined
>;

interface IProps {
  value: DroughtSpecificType;
  onChange: (event: DroughtSpecificType) => void;
  isEditMode: boolean;
}

export const DroughtTables = ({
  value,
  onChange,
  isEditMode,
}: IProps): JSX.Element => {
  const intl = useIntl();
  const showFormMessage = useShowFormMessage();
  const { data: constraints } = useGetFormConstraints(DROUGHT);
  const boundsByField = useMemo(
    () => buildFieldBounds(constraints, droughtSpecificKeys),
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
      {getDroughtTablesMapping(intl).map(
        ({ columns, columnGroup, groupParams }, index) => {
          const cols = applyFieldConstraints(
            columns,
            constraints,
            droughtSpecificKeys,
          );

          return (
            <DisasterTable
              columns={cols}
              columnGroup={
                groupParams
                  ? wrapGroupAsTitle({
                      columns: cols,
                      columnGroup,
                      groupParams,
                    })
                  : columnGroup
              }
              variant="open"
              data={[{ id: 1, ...value }]}
              onChange={onChange}
              onCellCommit={handleCellCommit}
              isEditable={isEditMode}
              key={index}
            />
          );
        },
      )}
    </ReportTablesWrapper>
  );
};
