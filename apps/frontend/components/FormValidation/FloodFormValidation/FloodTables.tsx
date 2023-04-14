import { floodSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { FloodCheckBoxes } from './FloodCheckBoxes';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from './tablesConfig/NumAffected-1';

export type FloodSpecificType = Record<
  keyof typeof floodSpecificKeys,
  string | object | undefined
>;

interface IProps {
  value: FloodSpecificType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
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
        threats={value.threat}
        onChange={onChange}
        value={value}
        isEditable={isEditMode}
      />
    </>
  );
};
