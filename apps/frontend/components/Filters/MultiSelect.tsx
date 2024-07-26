import {
  BaseSelectProps,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';
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

interface MultiSelectProps {
  value?: string[];
  options: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  allSelectedText: string;
  formatPrefix: string;
  width?: number;
  selectProps?: Partial<
    Omit<
      BaseSelectProps,
      | 'MenuProps'
      | 'renderValue'
      | 'displayEmpty'
      | 'multiple'
      | 'onChange'
      | 'value'
      | 'variant'
      | 'defaultValue'
    >
  >;
  disableMulti?: boolean;
}

const MultiSelect = ({
  options,
  onChange,
  placeholder,
  allSelectedText,
  formatPrefix,
  width = 200,
  selectProps = {},
  value: propValue = [],
  disableMulti = false,
}: MultiSelectProps) => {
  const intl = useIntl();
  const [value, setValue] = React.useState<string[]>(propValue);

  React.useEffect(() => {
    const filtered = value.filter(x => options.includes(x));
    setValue(filtered);
    onChange(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const isAllSelected = value.length === options.length;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: newValue },
    } = event;
    if (newValue[newValue.length - 1] === 'all') {
      const newVal = value.length === options.length ? [] : options;
      setValue(newVal);
      onChange(newVal);

      return;
    }
    // On autofill we get a stringified value.
    const newVal =
      typeof newValue === 'string' ? newValue.split(',') : newValue;
    const keepLast = disableMulti ? [newVal[newVal.length - 1]] : newVal;
    setValue(keepLast);
    onChange(keepLast);
  };

  return (
    <FormControl sx={{ m: 0, width, backgroundColor: 'white' }}>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={selectedIncidentKeys => {
          if (selectedIncidentKeys.length === 0) {
            return <FormattedMessage id={placeholder} />;
          }
          if (isAllSelected) {
            return <FormattedMessage id={allSelectedText} />;
          }

          return selectedIncidentKeys
            .map(incidentKey =>
              intl.formatMessage({
                id: `${formatPrefix}.${incidentKey}`,
              }),
            )
            .join(', ');
        }}
        MenuProps={MenuProps}
        {...selectProps}
      >
        {!disableMulti && (
          <MenuItem key="allSelected" value="all">
            <Checkbox
              checked={isAllSelected}
              indeterminate={value.length > 0 && value.length < options.length}
            />
            <ListItemText
              primary={
                <Typography fontWeight="bold">
                  <FormattedMessage id={allSelectedText} />
                </Typography>
              }
            />
          </MenuItem>
        )}
        {options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value.indexOf(option) > -1} />
            <ListItemText
              primary={intl.formatMessage({
                id: `${formatPrefix}.${option}`,
              })}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
