import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DROUGHT, FLOOD, INCIDENT } from '@wfp-dmp/interfaces';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const disasters = [
  { labelId: 'validation_params.flood', value: FLOOD },
  { labelId: 'validation_params.drought', value: DROUGHT },
];
const incidents = [
  { labelId: 'validation_params.incidents.storm', value: INCIDENT },
  { labelId: 'validation_params.incidents.fire', value: INCIDENT },
  { labelId: 'validation_params.incidents.lightning', value: INCIDENT },
  { labelId: 'validation_params.incidents.epidemics', value: INCIDENT },
  {
    labelId: 'validation_params.incidents.river_collapse',
    value: INCIDENT,
  },
  { labelId: 'validation_params.incidents.insects', value: INCIDENT },
  { labelId: 'validation_params.incidents.traffic', value: INCIDENT },
  { labelId: 'validation_params.incidents.drowning', value: INCIDENT },
  { labelId: 'validation_params.incidents.collapse', value: INCIDENT },
  { labelId: 'validation_params.incidents.weapon', value: INCIDENT },
  { labelId: 'validation_params.incidents.all', value: INCIDENT },
];
export const Validation = () => {
  const intl = useIntl();

  const [disasterType, setDisasterType] = useState(FLOOD);
  const handleDisasterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDisasterType = e.target.value;
    setDisasterType(newDisasterType);
  };

  return (
    <FormControl>
      <RadioGroup
        value={disasterType}
        onChange={handleDisasterChange}
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Box
          component="fieldset"
          sx={{ border: '2px solid grey', borderRadius: 2, margin: 2 }}
        >
          <legend>
            <FormattedMessage
              id="validation_params.disaster_type"
              defaultMessage="Disaster Type"
            />
          </legend>
          {disasters.map(type => (
            <FormControlLabel
              key={type.labelId}
              value={type.value}
              control={<Radio />}
              label={intl.formatMessage({
                id: type.labelId,
              })}
            />
          ))}
        </Box>
        <Box
          component="fieldset"
          width={600}
          sx={{
            border: '2px solid grey',
            borderRadius: 2,
            margin: 2,
          }}
        >
          <legend>
            <FormattedMessage
              id="validation_params.incidents.type"
              defaultMessage="Incident Type"
            />
          </legend>
          {incidents.map(type => (
            <FormControlLabel
              key={type.labelId}
              value={type.value}
              control={<Radio />}
              label={intl.formatMessage({
                id: type.labelId,
              })}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
