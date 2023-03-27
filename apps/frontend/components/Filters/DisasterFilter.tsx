import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { Control, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  control: Control<{ DisTyp: string }>;
}

export const DisasterFilter = ({ control }: Props): JSX.Element => {
  const intl = useIntl();

  const disasters = Object.keys(DisasterMapping).map(
    disaster => DisasterMapping[disaster],
  );
  const incidents = Object.keys(IncidentMapping).map(
    incident => IncidentMapping[incident],
  );

  return (
    <Controller
      name={'DisTyp'}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          value={value}
          onChange={onChange}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <Box
            component="fieldset"
            sx={{ border: '2px solid grey', borderRadius: 2, margin: 2 }}
          >
            <legend>
              <FormattedMessage
                id="validation_search_params.disaster_type"
                defaultMessage="Disaster Type"
              />
            </legend>
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
                id="validation_search_params.incident_type"
                defaultMessage="Incident Type"
              />
            </legend>
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
          </Box>
        </RadioGroup>
      )}
    />
  );
};
