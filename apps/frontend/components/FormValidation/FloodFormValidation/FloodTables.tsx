import { FloodSpecificType } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { FloodCheckBoxes } from './FloodCheckBoxes';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from './tablesConfig/NumAffected-1';

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
        columns={NumAffected1Columns}
        columnGroup={NumAffected1ColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <FloodCheckBoxes
        onChange={onChange}
        value={value}
        isEditable={isEditMode}
      />
    </>
  );
};
