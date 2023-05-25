import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { IncidentMapping } from '@wfp-dmp/interfaces';
import { remove } from 'lodash';
import { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';

const incidentsKeys = Object.keys(IncidentMapping).map(
  incident => IncidentMapping[incident],
);

export const IncidentCheckBoxes = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newValue: string[]) => void;
}) => {
  const intl = useIntl();

  const changeFn = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const checkbox = event.target.name;
    const incidentsUpdated = [...value];
    if (checked) {
      incidentsUpdated.push(checkbox);
    } else {
      remove(incidentsUpdated, incident => incident === checkbox);
    }
    onChange(incidentsUpdated);
  };

  return (
    <FormControl sx={{ m: 3 }} variant="standard">
      <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
        {incidentsKeys.map(incidentKey => {
          return (
            <Box key={incidentKey}>
              <FormControlLabel
                key={incidentKey}
                control={
                  <Checkbox
                    onChange={changeFn}
                    name={incidentKey.toString()}
                    key={incidentKey}
                    checked={value.includes(incidentKey)}
                  />
                }
                label={intl.formatMessage({
                  id: `disasters.${incidentKey}`,
                })}
              />
            </Box>
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
