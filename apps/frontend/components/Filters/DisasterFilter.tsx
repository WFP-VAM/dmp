import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DisasterMapping, INCIDENT } from '@wfp-dmp/interfaces';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { IncidentSelect } from './IncidentSelect';

const floodDroughtKeys = Object.keys(DisasterMapping).map(
  disaster => DisasterMapping[disaster],
);
const disasterKeys = [...floodDroughtKeys, INCIDENT];

interface Props {
  value: string[];
  onChange: (newValue: string[]) => void;
}

export const DisasterFilter = ({ value, onChange }: Props): JSX.Element => {
  const intl = useIntl();
  // value can contain more than one element only for incident
  //disaster type value "1", "2" or INCIDENT
  const [disasterType, setDisasterType] = useState(
    floodDroughtKeys.includes(value[0]) ? value[0] : INCIDENT,
  );
  const [incidents, setIncidents] = useState<string[]>(
    floodDroughtKeys.includes(value[0]) ? [] : value,
  );

  const onDisasterTypeChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setDisasterType(newValue);

    if (floodDroughtKeys.includes(newValue)) {
      onChange([newValue]);
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
      margin={2}
    >
      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.disaster_type" />
        </InputLabel>
        <Select
          value={disasterType}
          onChange={onDisasterTypeChange}
          label={intl.formatMessage({
            id: 'validation_search_params.disaster_type',
          })}
          sx={{ minWidth: 150, mr: 2 }}
        >
          {disasterKeys.map(disasterKey => {
            return (
              <MenuItem value={disasterKey} key={disasterKey}>
                <FormattedMessage id={`disasters.${disasterKey}`} />
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
