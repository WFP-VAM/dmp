import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
// Import polyfills for Intl.NumberFormat and Intl.DateTimeFormat
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/km';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/km';

type LanguageContext = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>> | (() => void);
};

const languageContextDefault = {
  language: 'km',
  setLanguage: () => undefined,
};
const LanguageContext = createContext<LanguageContext>(languageContextDefault);

interface Props {
  children?: ReactNode;
}

const LanguageWrapper = ({ children }: Props): JSX.Element | null => {
  const [language, setLanguage] = useState('km');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (typeof stored === 'string' && stored.trim() !== '') {
      setLanguage(stored);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('language', language);
    }
  }, [language, isReady]);

  if (!isReady) return null; // Or a loader

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguageContext = (): LanguageContext => {
  return useContext(LanguageContext);
};

export { LanguageWrapper, useLanguageContext };
