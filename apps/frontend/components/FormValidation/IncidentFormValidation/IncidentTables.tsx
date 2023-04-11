import { incidentSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import {
  NumAffectedColumnGroup,
  NumAffectedColumns,
} from './tablesConfig/NumAffected';

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
    <>
      <DisasterTable
        columns={NumAffectedColumns}
        columnGroup={NumAffectedColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
    </>
  );
};
