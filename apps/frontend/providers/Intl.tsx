import { IntlProvider } from 'react-intl';

import { useLanguageContext } from 'context';
import { flattenMessages } from 'services/intl';
import en from 'translations/en.json';
import km from 'translations/km.json';

export const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'km':
      return flattenMessages(km);
    case 'en':
      return flattenMessages(en);
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
