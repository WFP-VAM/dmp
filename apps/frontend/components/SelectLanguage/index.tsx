import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLanguageContext } from 'context';
import { colors } from 'theme/muiTheme';

const SelectLanguage = (): JSX.Element => {
  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (e: SelectChangeEvent) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  return (
    <FormControl sx={{ padding: 0 }}>
      <Select
        disableUnderline
        variant="standard"
        value={language}
        onChange={handleLanguageChange}
        startAdornment={
          <FontAwesomeIcon
            icon={faGlobe}
            style={{ marginRight: '-1rem', color: colors.color3 }}
          />
        }
        renderValue={v => v.toUpperCase()}
        IconComponent={() => null}
        inputProps={{
          sx: { padding: '0 !important' },
        }}
        style={{ height: '2.5rem', width: '3rem', textAlign: 'right' }}
      >
        <MenuItem value="en">
          <FormattedMessage
            id="navigation.language.english"
            defaultMessage="EN"
          />
        </MenuItem>
        <MenuItem value="km">
          <FormattedMessage
            id="navigation.language.khmer"
            defaultMessage="KM"
          />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
