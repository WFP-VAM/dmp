import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useIntl } from 'react-intl';

const disasters = [
  { labelId: 'validation_params.flood', value: 'flood' },
  { labelId: 'validation_params.drought', value: 'drought' },
];
const incidents = [
  { labelId: 'validation_params.incidents.storm', value: 'storm' },
  { labelId: 'validation_params.incidents.fire', value: 'fire' },
  { labelId: 'validation_params.incidents.lightning', value: 'lightning' },
  { labelId: 'validation_params.incidents.epidemics', value: 'epidemics' },
  {
    labelId: 'validation_params.incidents.river_collapse',
    value: 'river_collapse',
  },
  { labelId: 'validation_params.incidents.inserts', value: 'inserts' },
  { labelId: 'validation_params.incidents.traffic', value: 'traffic' },
  { labelId: 'validation_params.incidents.drowning', value: 'drowning' },
  { labelId: 'validation_params.incidents.collapse', value: 'collapse' },
  { labelId: 'validation_params.incidents.weapon', value: 'weapon' },
  { labelId: 'validation_params.incidents.all', value: 'all' },
];
const Validation = () => {
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
          <legend>Disaster Type</legend>
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
          <legend>Incident Type</legend>
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

export default Validation;
