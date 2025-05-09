import { IntlProvider } from 'react-intl';

import { useLanguageContext } from 'context';
import { flattenMessages } from 'services/intl';
import communes from 'translations/communes.json';
import en from 'translations/en.json';
import km from 'translations/km.json';
import villages from 'translations/villages.json';

export const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'km':
      return flattenMessages({
        ...km,
        commune: communes['km'],
        village: villages['km'],
      });
    case 'en':
      return flattenMessages({
        ...en,
        commune: communes['en'],
        village: villages['en'],
      });
  }
};

type IntlProps = {
  children: React.ReactNode;
};

export const Intl = ({ children }: IntlProps): JSX.Element => {
  const { language } = useLanguageContext();
  const messages = loadLocaleData(language);

  return (
    <IntlProvider locale={language} messages={messages} defaultLocale="km">
      {children}
    </IntlProvider>
  );
};
