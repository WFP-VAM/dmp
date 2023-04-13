import { droughtSpecificKeys } from '@wfp-dmp/interfaces';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import { useLanguageContext } from 'context';

import {
  NumAffectedColumnGroup,
  NumAffectedColumns,
} from './tablesConfig/NumAffected';

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
  const { language } = useLanguageContext();
  const affectedColumns = NumAffectedColumns(language);

  return (
    <>
      <DisasterTable
        columns={affectedColumns}
        columnGroup={NumAffectedColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
    </>
  );
};
