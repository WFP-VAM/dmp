import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export const DisasterSelect = ({ value, onChange }: Props): JSX.Element => {
  const intl = useIntl();

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
          {[1, 2, 3].map(disaster => {
            const key = disaster.toString();

            return (
              <MenuItem value={key} key={key}>
                <FormattedMessage id={`disaster_categories.${key}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
