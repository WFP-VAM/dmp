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

const SelectLanguage = (): JSX.Element => {
  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (e: SelectChangeEvent) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  return (
    <FormControl sx={{ padding: 0 }}>
      <Select
        value={language}
        onChange={handleLanguageChange}
        startAdornment={
          <FontAwesomeIcon
            icon={faGlobe}
            style={{ marginRight: '0.5rem', color: 'var(--color_primary_3)' }}
          />
        }
        style={{ height: '2.5rem' }}
      >
        <MenuItem value="en">
          <FormattedMessage
            id="navigation.language.english"
            defaultMessage="English"
          />
        </MenuItem>
        <MenuItem value="km">
          <FormattedMessage
            id="navigation.language.khmer"
            defaultMessage="ភាសាខ្មែរ"
          />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
