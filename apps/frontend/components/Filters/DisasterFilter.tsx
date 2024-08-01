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
  IncidentMapping,
} from '@wfp-dmp/interfaces';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import MultiSelect from './MultiSelect';

const disasters = [FLOOD, DROUGHT, INCIDENT];

const incidentsKeys = Object.keys(IncidentMapping).map(
  incident => IncidentMapping[incident],
);

interface Props {
  value: string[];
  onChange: (newValue: string[]) => void;
  disabled?: boolean;
}

export const DisasterFilter = ({
  value,
  onChange,
  disabled,
}: Props): JSX.Element => {
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
          disabled={disabled}
          value={disasterType}
          onChange={onDisasterTypeChange}
          sx={{
            minWidth: 150,
            backgroundColor: 'white',
            height: '2.5rem',
          }}
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
        <FormControl sx={{ ml: 2 }}>
          <MultiSelect
            value={value}
            disabled={disabled}
            options={incidentsKeys}
            onChange={v => {
              onIncidentsChange(v);
            }}
            placeholder="validation_search_params.incident_type"
            allSelectedText="disasters.ALL_INCIDENTS"
            formatPrefix="disasters"
          />
        </FormControl>
      )}
    </Box>
  );
};
