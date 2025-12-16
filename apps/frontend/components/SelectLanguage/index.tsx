import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLanguageContext } from 'context';
import { colors } from 'theme/muiTheme';

const SelectLanguage = (): JSX.Element => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        renderValue={v =>
          isMobile ? null : <Typography>{v.toUpperCase()}</Typography>
        }
        IconComponent={() => null}
        inputProps={{
          sx: { padding: '0 !important' },
          'aria-label': intl.formatMessage({
            id: 'navigation.language.select',
            defaultMessage: 'Select Language',
          }),
        }}
        style={{
          width: isMobile ? '2rem' : '3rem',
          textAlign: 'right',
        }}
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
