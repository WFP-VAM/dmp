import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { ChangeEvent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DisasterFilter = ({ value, onChange }: Props): JSX.Element => {
  const intl = useIntl();

  const disasters = Object.keys(DisasterMapping).map(
    disaster => DisasterMapping[disaster],
  );
  const incidents = Object.keys(IncidentMapping).map(
    incident => IncidentMapping[incident],
  );

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
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
          {disasters.map(type => (
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
      <Card variant="outlined" sx={{ maxWidth: 600, marginLeft: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            <FormattedMessage
              id="validation_search_params.incident_type"
              defaultMessage="Incident Type"
            />
          </Typography>
          {incidents.map(type => (
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
    </RadioGroup>
  );
};
