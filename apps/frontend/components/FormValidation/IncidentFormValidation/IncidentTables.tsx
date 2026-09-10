import { INCIDENT, incidentSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';
import { useGetFormConstraints } from 'services/api/kobo/useGetFormConstraints';
import { applyFieldConstraints } from 'utils/koboConstraints';
import { wrapGroupAsTitle } from 'utils/tableFormatting';

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
  const { data: constraints } = useGetFormConstraints(INCIDENT);

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
