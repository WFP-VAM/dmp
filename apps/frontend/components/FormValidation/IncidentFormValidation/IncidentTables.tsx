import { INCIDENT, incidentSpecificKeys } from '@wfp-dmp/interfaces';
import { useCallback, useMemo } from 'react';

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
import { incidentTablesMapping } from './incidentTablesMapping';

export type IncidentSpecificType = Record<
  keyof typeof incidentSpecificKeys,
  string | undefined
>;

interface IProps {
  value: IncidentSpecificType;
  onChange: (event: IncidentSpecificType) => void;
  isEditMode: boolean;
}

export const IncidentTables = ({
  value,
  onChange,
  isEditMode,
}: IProps): JSX.Element => {
  const showFormMessage = useShowFormMessage();
  const { data: constraints } = useGetFormConstraints(INCIDENT);
  const boundsByField = useMemo(
    () => buildFieldBounds(constraints, incidentSpecificKeys),
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
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => {
          const cols = applyFieldConstraints(
            columns,
            constraints,
            incidentSpecificKeys,
          );
          const group = wrapGroupAsTitle({
            columns: cols,
            columnGroup,
            groupParams,
          });

          return (
            <DisasterTable
              columns={cols}
              columnGroup={group}
              data={[{ id: 1, ...value }]}
              onChange={onChange}
              onCellCommit={handleCellCommit}
              isEditable={isEditMode}
              variant="open"
              key={index}
            />
          );
        },
      )}
    </ReportTablesWrapper>
  );
};
