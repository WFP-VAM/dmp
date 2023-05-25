import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DisasterMapping, INCIDENT } from '@wfp-dmp/interfaces';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { IncidentCheckBoxes } from './IncidentCheckboxes';

const floodDroughtKeys = Object.keys(DisasterMapping).map(
  disaster => DisasterMapping[disaster],
);
interface Props {
  value: string[];
  onChange: (newValue: string[]) => void;
}

export const DisasterFilter = ({ value, onChange }: Props): JSX.Element => {
  const intl = useIntl();
  // value can contain more than one element only for incident
  // radio value "1", "2" or INCIDENT
  const [radioValue, setRadioValue] = useState(
    floodDroughtKeys.includes(value[0]) ? value[0] : INCIDENT,
  );
  const [incidents, setIncidents] = useState<string[]>(
    floodDroughtKeys.includes(value[0]) ? [] : value,
  );

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radio = event.target.value;
    setRadioValue(radio);

    if (floodDroughtKeys.includes(radio)) {
      onChange([radio]);
    } else {
      onChange(incidents);
    }
  };

  const onCheckboxesChange = (newValue: string[]) => {
    setIncidents(newValue);
    onChange(newValue);
  };

  return (
    <RadioGroup
      value={radioValue}
      onChange={onRadioChange}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 3,
      }}
    >
      <Card variant="outlined" sx={{ marginRight: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            <FormattedMessage
              id="validation_search_params.disaster_type"
              defaultMessage="Disaster Type"
            />
          </Typography>
          {floodDroughtKeys.map(type => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio />}
              label={intl.formatMessage({
                id: `disasters.${type}`,
              })}
            />
          ))}
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ minHeight: 100, minWidth: 400, maxWidth: 600, marginLeft: 5 }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            <FormattedMessage
              id="validation_search_params.incident_type"
              defaultMessage="Incident Type"
            />
          </Typography>
          <FormControlLabel
            key={INCIDENT}
            value={INCIDENT}
            control={<Radio />}
            label={intl.formatMessage({
              id: `disasters.99`,
            })}
          />
          {radioValue === INCIDENT && (
            <IncidentCheckBoxes
              value={incidents}
              onChange={onCheckboxesChange}
            />
          )}
        </CardContent>
      </Card>
    </RadioGroup>
  );
};
