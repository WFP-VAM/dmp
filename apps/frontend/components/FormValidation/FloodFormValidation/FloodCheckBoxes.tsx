import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { range, remove } from 'lodash';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { FloodSpecificType } from './FloodTables';
export const FloodCheckBoxes = ({
  threats,
  onChange,
  value,
  isEditable,
}: {
  threats: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  value: FloodSpecificType;
  isEditable: boolean;
}) => {
  const intl = useIntl();

  const [threatsArr, setThreatsArr] = useState(threats?.split(' ') ?? []);
  const changeFn = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const checkbox = event.target.name;
    const threatsCopy = [...threatsArr];
    if (checked) {
      threatsCopy.push(checkbox);
    } else {
      remove(threatsCopy, threat => threat === checkbox);
    }
    onChange({
      ...value,
      threat: threatsCopy.join(' '),
    });
    setThreatsArr(threatsCopy);
  };

  return (
    <FormControl component="fieldset" sx={{ m: 3 }} variant="standard">
      <FormGroup>
        <FormLabel>
          <FormattedMessage id="table.FLOOD.securityIssues.title" />
        </FormLabel>
        {range(1, 15).map(int => {
          const key = int.toString();

          return (
            <Box key={int}>
              <FormControlLabel
                key={int}
                control={
                  <Checkbox
                    disabled={!isEditable}
                    onChange={changeFn}
                    name={int.toString()}
                    key={int}
                    checked={threats?.split(' ').includes(key)}
                  />
                }
                label={intl.formatMessage({
                  id: `table.FLOOD.securityIssues.${int}`,
                })}
              />
            </Box>
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
