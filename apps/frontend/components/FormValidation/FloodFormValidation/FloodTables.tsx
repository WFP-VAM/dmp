import { TextField } from '@mui/material';
import { FloodSpecific, FloodSpecificType } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { FloodCheckBoxes } from './FloodCheckBoxes';
import { getFloodTablesMapping } from './floodTablesMapping';

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
  const intl = useIntl();

  return (
    <>
      <TextField
        disabled={!isEditMode}
        label={intl.formatMessage({
          id: 'table.FLOOD.floodN',
        })}
        type="number"
        value={value.floodN}
        onChange={event =>
          onChange({ ...value, [FloodSpecific.floodN]: event.target.value })
        }
        sx={{ m: 2 }}
      />
      {getFloodTablesMapping(intl).map(({ columns, columnGroup }, index) => (
        <DisasterTable
          columns={typeof columns === 'function' ? columns(false) : columns}
          columnGroup={
            typeof columnGroup === 'function' ? columnGroup(false) : columnGroup
          }
          data={[{ id: 1, ...value }]}
          onChange={onChange}
          isEditable={isEditMode}
          key={index}
        />
      ))}
      <FloodCheckBoxes
        onChange={onChange}
        value={value}
        isEditable={isEditMode}
      />
    </>
  );
};
