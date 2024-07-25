import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from '@mui/material';
import { FloodSpecificType } from '@wfp-dmp/interfaces';
import { range, remove } from 'lodash';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export const FloodCheckBoxes = ({
  onChange,
  value,
  isEditable,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  isEditable: boolean;
  value: FloodSpecificType;
}) => {
  const intl = useIntl();

  const [threatsArr, setThreatsArr] = useState(value.threat?.split(' ') ?? []);
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
          <Typography variant="h5">
            <FormattedMessage id="table.FLOOD.securityIssues.title" />
          </Typography>
        </FormLabel>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {range(1, 15).map(threatNum => {
            const key = threatNum.toString();

            return (
              <Box key={threatNum} flexBasis={'30%'}>
                <FormControlLabel
                  key={threatNum}
                  control={
                    <Checkbox
                      disabled={!isEditable}
                      onChange={changeFn}
                      name={threatNum.toString()}
                      key={threatNum}
                      checked={threatsArr.includes(key)}
                    />
                  }
                  label={intl.formatMessage({
                    id: `table.FLOOD.securityIssues.${threatNum}`,
                  })}
                />
              </Box>
            );
          })}
        </Box>
      </FormGroup>
    </FormControl>
  );
};
