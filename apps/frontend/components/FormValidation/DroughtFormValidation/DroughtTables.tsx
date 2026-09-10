import { DROUGHT, droughtSpecificKeys } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';
import ReportTablesWrapper from 'components/ReportTablesWrapper';
import { useGetFormConstraints } from 'services/api/kobo/useGetFormConstraints';
import { applyFieldConstraints } from 'utils/koboConstraints';
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
  const { data: constraints } = useGetFormConstraints(DROUGHT);

  return (
    <ReportTablesWrapper>
      {getDroughtTablesMapping(intl).map(
        ({ columns, columnGroup, groupParams }, index) => {
          const cols = applyFieldConstraints(
            columns,
            constraints,
            droughtSpecificKeys,
          );

          return (
            <DisasterTable
              columns={cols}
              columnGroup={
                groupParams
                  ? wrapGroupAsTitle({
                      columns: cols,
                      columnGroup,
                      groupParams,
                    })
                  : columnGroup
              }
              variant="open"
              data={[{ id: 1, ...value }]}
              onChange={onChange}
              isEditable={isEditMode}
              key={index}
            />
          );
        },
      )}
    </ReportTablesWrapper>
  );
};
