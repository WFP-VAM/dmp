import LanguageIcon from '@mui/icons-material/Language';
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
        startAdornment={<LanguageIcon sx={{ marginRight: 1 }} />}
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
