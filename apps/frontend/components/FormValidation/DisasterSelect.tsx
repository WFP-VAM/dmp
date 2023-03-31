import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DisasterMapping, IncidentMapping } from '@wfp-dmp/interfaces';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

const selectOptions = (disasterType: string): string[] => {
  let opts;
  if (
    disasterType === DisasterMapping.flood ||
    disasterType === DisasterMapping.drought
  ) {
    opts = [disasterType];
  } else {
    opts = Object.values(IncidentMapping);
  }

  return opts;
};

export const DisasterSelect = ({
  value,
  onChange,
  disabled,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" margin={2}>
      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.disaster_type" />
        </InputLabel>
        <Select
          disabled={disabled}
          value={value}
          onChange={onChange}
          sx={{ minWidth: 200 }}
          label={intl.formatMessage({
            id: 'validation_search_params.disaster_type',
          })}
        >
          {selectOptions(value).map(disaster => {
            return (
              <MenuItem value={disaster} key={disaster}>
                <FormattedMessage id={`disasters.${disaster}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
