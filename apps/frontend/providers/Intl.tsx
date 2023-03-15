import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { flattenMessages } from 'services/intl';
import en from 'translations/en.json';
import km from 'translations/km.json';

const loadLocaleData = (locale: string | undefined) => {
  switch (locale) {
    case 'km':
      return flattenMessages(km);
    case 'en':
      return flattenMessages(en);
    default:
      return flattenMessages(en);
  }
};

type IntlProps = {
  children: React.ReactNode;
};

export const Intl = ({ children }: IntlProps): JSX.Element => {
  const { locale, defaultLocale } = useRouter();
  const browserLocale = locale != null ? locale : 'km';

  const [currentLocale, setCurrentLocale] = useState(browserLocale);
  const messages = loadLocaleData(currentLocale);

  const handleChange = (e: SelectChangeEvent) => {
    const overrideLocale = e.target.value;
    setCurrentLocale(overrideLocale);
  };

  return (
    <IntlProvider
      locale={currentLocale}
      messages={messages}
      defaultLocale={defaultLocale}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentLocale}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="km">Khmer</MenuItem>
        </Select>
      </FormControl>
      {children}
    </IntlProvider>
  );
};
