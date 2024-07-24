import { droughtSpecificKeys } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import { wrapGroupAsTitle } from 'utils/tableFormatting';

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
      {getDroughtTablesMapping(intl).map(
        ({ columns, columnGroup, groupParams }, index) => (
          <DisasterTable
            columns={columns}
            columnGroup={
              groupParams
                ? wrapGroupAsTitle({
                    columns,
                    columnGroup,
                    groupParams,
                  })
                : columnGroup
            }
            variant="bordered"
            data={[{ id: 1, ...value }]}
            onChange={onChange}
            isEditable={isEditMode}
            key={index}
          />
        ),
      )}
    </>
  );
};
