import { droughtSpecificKeys } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

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

  return (
    <>
      {getDroughtTablesMapping(intl).map(({ columns, columnGroup }, index) => (
        <DisasterTable
          columns={columns}
          columnGroup={
            typeof columnGroup === 'function' ? columnGroup(false) : columnGroup
          }
          data={[{ id: 1, ...value }]}
          onChange={onChange}
          isEditable={isEditMode}
          key={index}
        />
      ))}
    </>
  );
};
