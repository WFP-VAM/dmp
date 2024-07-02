import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { IncidentMapping } from '@wfp-dmp/interfaces';
import { FormattedMessage, useIntl } from 'react-intl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const incidentsKeys = Object.keys(IncidentMapping).map(
  incident => IncidentMapping[incident],
);

export const IncidentSelect = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newValue: string[]) => void;
}) => {
  const intl = useIntl();

  const isAllSelected = value.length === incidentsKeys.length;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: newValue },
    } = event;
    if (newValue[newValue.length - 1] === 'all') {
      onChange(value.length === incidentsKeys.length ? [] : incidentsKeys);

      return;
    }
    onChange(
      // On autofill we get a stringified value.
      typeof newValue === 'string' ? newValue.split(',') : newValue,
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300, backgroundColor: 'white' }}>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={selectedIncidentKeys => {
          if (selectedIncidentKeys.length === 0) {
            return (
              <FormattedMessage id="validation_search_params.incident_type" />
            );
          }
          if (isAllSelected) {
            return <FormattedMessage id="disasters.ALL_INCIDENTS" />;
          }

          return selectedIncidentKeys
            .map(incidentKey =>
              intl.formatMessage({
                id: `disasters.${incidentKey}`,
              }),
            )
            .join(', ');
        }}
        MenuProps={MenuProps}
      >
        <MenuItem key="allSelected" value="all">
          <Checkbox
            checked={isAllSelected}
            indeterminate={
              value.length > 0 && value.length < incidentsKeys.length
            }
          />
          <ListItemText
            primary={
              <Typography fontWeight="bold">
                <FormattedMessage id="disasters.ALL_INCIDENTS" />
              </Typography>
            }
          />
        </MenuItem>
        {incidentsKeys.map(incidentKey => (
          <MenuItem key={incidentKey} value={incidentKey}>
            <Checkbox checked={value.indexOf(incidentKey) > -1} />
            <ListItemText
              primary={intl.formatMessage({
                id: `disasters.${incidentKey}`,
              })}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
