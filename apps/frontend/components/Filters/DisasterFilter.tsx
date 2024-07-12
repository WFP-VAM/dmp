import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  computeDisasterTypeFromDistTyps,
  DisasterMapping,
  DROUGHT,
  FLOOD,
  INCIDENT,
} from '@wfp-dmp/interfaces';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { IncidentSelect } from './IncidentSelect';

const disasters = [FLOOD, DROUGHT, INCIDENT];

interface Props {
  value: string[];
  onChange: (newValue: string[]) => void;
}

export const DisasterFilter = ({ value, onChange }: Props): JSX.Element => {
  // value can contain more than one element only for incident
  // value can be empty if it is an INCIDENT
  const disTyp =
    value.length === 0 ? INCIDENT : computeDisasterTypeFromDistTyps(value);

  const [disasterType, setDisasterType] = useState<string>(disTyp);
  const [incidents, setIncidents] = useState<string[]>(
    disTyp === INCIDENT ? value : [],
  );

  const onDisasterTypeChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setDisasterType(newValue);

    if (newValue === FLOOD) {
      onChange([DisasterMapping.flood]);
    } else if (newValue === DROUGHT) {
      onChange([DisasterMapping.drought]);
    } else {
      onChange(incidents);
    }
  };

  const onIncidentsChange = (newValue: string[]) => {
    setIncidents(newValue);
    onChange(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="left"
      alignItems="center"
    >
      <FormControl>
        <Select
          value={disasterType}
          onChange={onDisasterTypeChange}
          sx={{ minWidth: 150, mr: 2, backgroundColor: 'white' }}
        >
          {disasters.map(disaster => {
            return (
              <MenuItem value={disaster} key={disaster}>
                <FormattedMessage id={`disasters.${disaster}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {disasterType === INCIDENT && (
        <IncidentSelect value={incidents} onChange={onIncidentsChange} />
      )}
    </Box>
  );
};
