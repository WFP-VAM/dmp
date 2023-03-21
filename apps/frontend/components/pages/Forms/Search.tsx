import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

interface Props {
  disasterType: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DisasterFilter = ({ disasterType, onChange }: Props): JSX.Element => {
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
    <FormControl>
      <RadioGroup
        value={disasterType}
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
    </FormControl>
  );
};
export const FormSearch = () => {
  const defaultDisaster = DisasterMapping['flood'];
  const [disasterType, setDisasterType] = useState(defaultDisaster);
  const handleDisasterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDisasterType = e.target.value;
    setDisasterType(newDisasterType);
  };
  const [filters, setFilters] = useState({ disType: defaultDisaster });
  const handleSearch = () => {
    setFilters({ ...filters, disType: disasterType });
  };

  const { data } = useSWR(
    [ApiRoutes.forms, filters],
    async (relativePath, filterOptions) => {
      await apiClient
        .get<unknown>(relativePath, { params: filterOptions })
        .then(response => response.data);
    },
  );
  console.log(data);

  return (
    <Box display="flex" flexDirection="column">
      <DisasterFilter
        onChange={handleDisasterChange}
        disasterType={disasterType}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
};
