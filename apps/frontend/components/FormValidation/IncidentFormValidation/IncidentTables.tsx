import { incidentSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';
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
  return (
    <ReportTablesWrapper>
      {incidentTablesMapping.map(
        ({ columns, columnGroup, groupParams }, index) => {
          const group = wrapGroupAsTitle({ columns, columnGroup, groupParams });

          return (
            <DisasterTable
              columns={columns}
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
