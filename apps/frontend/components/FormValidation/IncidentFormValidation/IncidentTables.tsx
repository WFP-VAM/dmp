import { Stack, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(4)}>
      {incidenTablesMapping.map(({ columns, columnGroup }, index) => (
        <DisasterTable
          columns={columns}
          columnGroup={columnGroup(false)}
          data={[{ id: 1, ...value }]}
          onChange={onChange}
          isEditable={isEditMode}
          key={index}
        />
      ))}
    </Stack>
  );
};
