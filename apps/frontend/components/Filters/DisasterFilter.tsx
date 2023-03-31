import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
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
    <Box display="flex" flexDirection="row" justifyContent="center" margin={2}>
      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.disaster_type" />
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          sx={{ minWidth: 200 }}
          label={intl.formatMessage({
            id: 'validation_search_params.disaster_type',
          })}
        >
          <ListSubheader>
            <FormattedMessage id="validation_search_params.disaster_type" />
          </ListSubheader>

          {disasters.map(disaster => {
            return (
              <MenuItem value={disaster} key={disaster}>
                <FormattedMessage id={`disasters.${disaster}`} />
              </MenuItem>
            );
          })}
          <ListSubheader>
            <FormattedMessage id="validation_search_params.incident_type" />
          </ListSubheader>

          {incidents.map(incident => {
            return (
              <MenuItem value={incident} key={incident}>
                <FormattedMessage id={`disasters.${incident}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
