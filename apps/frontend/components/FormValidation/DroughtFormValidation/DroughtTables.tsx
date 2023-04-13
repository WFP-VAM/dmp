import { droughtSpecificKeys } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import {
  NumAffectedColumnGroup,
  NumAffectedColumns,
} from './tablesConfig/NumAffected';
import {
  SocialSectorAffectedColumnGroup,
  SocialSectorAffectedColumns,
} from './tablesConfig/SocialSectorAffected';

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
      <DisasterTable
        columns={NumAffectedColumns}
        columnGroup={NumAffectedColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={SocialSectorAffectedColumns(intl)}
        columnGroup={SocialSectorAffectedColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
    </>
  );
};
