import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { FloodSpecificType } from './FloodTables';

export const FloodCheckBoxes = ({
  threats,
  setFormattedThreatsString,
  onChange,
  value,
  isEditable,
}: {
  setFormattedThreatsString: Dispatch<SetStateAction<object>>;
  threats: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  value: FloodSpecificType;
  isEditable: boolean;
}) => {
  const changeFn = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const newThreats = { ...threats };
    newThreats[event.target.name] = checked;

    setFormattedThreatsString(newThreats);
    onChange({
      ...value,
      threat: newThreats,
    });
  };
  const intl = useIntl();

  return (
    <FormControl component="fieldset" sx={{ m: 3 }} variant="standard">
      <FormGroup>
        {[1, 2, 3, 4].map(int => {
          const key = int.toString();

          return (
            <>
              <FormControlLabel
                key={int}
                control={
                  <Checkbox
                    disabled={!isEditable}
                    onChange={changeFn}
                    name={int.toString()}
                    key={int}
                    checked={threats[key] === true ? true : false}
                  />
                }
                label={intl.formatMessage({
                  id: `table.FLOOD.securityIssues.${int}`,
                })}
              />
            </>
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
