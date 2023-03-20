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
  { labelId: 'validation_params.incident.storm', value: 'storm' },
  { labelId: 'validation_params.incident.fire', value: 'fire' },
  { labelId: 'validation_params.incident.lightning', value: 'lightning' },
  { labelId: 'validation_params.incident.epidemics', value: 'epidemics' },
  {
    labelId: 'validation_params.incident.river_collapse',
    value: 'river_collapse',
  },
  { labelId: 'validation_params.incident.insects', value: 'insects' },
  { labelId: 'validation_params.incident.traffic', value: 'traffic' },
  { labelId: 'validation_params.incident.drowning', value: 'drowning' },
  { labelId: 'validation_params.incident.collapse', value: 'collapse' },
  { labelId: 'validation_params.incident.weapon', value: 'weapon' },
  { labelId: 'validation_params.incident.all', value: 'all' },
];
export const ReportValidation = () => {
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
              id="validation_params.incident.type"
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
