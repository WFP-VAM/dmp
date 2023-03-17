import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const disasters = [
  { labelId: 'validation_params.flood', value: 'flood' },
  { labelId: 'validation_params.drought', value: 'drought' },
];
const incidents = [
  { labelId: 'validation_params.incidents.storm', value: 'incident' },
  { labelId: 'validation_params.incidents.fire', value: 'incident' },
  { labelId: 'validation_params.incidents.lightning', value: 'incident' },
  { labelId: 'validation_params.incidents.epidemics', value: 'incident' },
  {
    labelId: 'validation_params.incidents.river_collapse',
    value: 'incident',
  },
  { labelId: 'validation_params.incidents.insects', value: 'incident' },
  { labelId: 'validation_params.incidents.traffic', value: 'incident' },
  { labelId: 'validation_params.incidents.drowning', value: 'incident' },
  { labelId: 'validation_params.incidents.collapse', value: 'incident' },
  { labelId: 'validation_params.incidents.weapon', value: 'incident' },
  { labelId: 'validation_params.incidents.all', value: 'incident' },
];
export const Validation = () => {
  const intl = useIntl();

  const [disasterType, setDisasterType] = useState('flood');
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
