import { useRouter } from 'next/router';
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
  const currentLocale = locale != null ? locale : 'km';
  const messages = loadLocaleData(currentLocale);

  return (
    <IntlProvider
      locale={currentLocale}
      messages={messages}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
};
