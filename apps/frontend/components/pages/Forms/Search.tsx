import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useForms } from 'services/forms/useForms';

interface Props {
  control: Control<{ DisTyp: string }>;
}

const DisasterFilter = ({ control }: Props): JSX.Element => {
  const intl = useIntl();

  const disasters = Object.keys(DisasterMapping).map(disaster => {
    return {
      labelId: `validation_params.${disaster}`,
      value: DisasterMapping[disaster],
    };
  });
  const incidents = Object.keys(IncidentMapping).map(incident => {
    return {
      labelId: `validation_params.${incident}`,
      value: IncidentMapping[incident],
    };
  });

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
                id="validation_params.incident_type"
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
      )}
    />
  );
};

export const FormSearch = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { DisTyp: '1' },
  });

  const defaultDisaster = DisasterMapping['flood'];
  const [disasterType, setDisasterType] = useState(defaultDisaster);

  const submitHandler = (data: { DisTyp: string }) => {
    setDisasterType(data.DisTyp);
  };
  const forms = useForms(disasterType);

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DisasterFilter control={control} />
          <Button sx={{ color: 'white', float: 'right' }} type="submit">
            <FormattedMessage
              id="navigation.forms.search"
              defaultMessage="Hide password"
            />
          </Button>
        </form>
      </Box>
      <Box>{JSON.stringify(forms)}</Box>
    </Box>
  );
};
