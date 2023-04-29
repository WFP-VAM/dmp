import { incidentSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { incidenTablesMapping } from './incidentTablesMapping';

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
      {incidenTablesMapping.map((tableSetting, index) => (
        <DisasterTable
          columns={tableSetting.columns}
          columnGroup={tableSetting.columnGroup}
          data={[{ id: 1, ...value }]}
          onChange={onChange}
          isEditable={isEditMode}
          key={index}
        />
      ))}
    </>
  );
};
