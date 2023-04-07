import { floodSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { A1ColumnGroup, A1Columns } from './tablesConfig/A1Config';

export type FloodSpecificType = Record<
  keyof typeof floodSpecificKeys,
  string | undefined
>;

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
  return (
    <>
      <DisasterTable
        columns={A1Columns}
        columnGroup={A1ColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
    </>
  );
};
