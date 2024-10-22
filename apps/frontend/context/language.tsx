import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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

const LanguageWrapper = ({ children }: Props): JSX.Element => {
  const [language, setLanguage] = useState(() => {
    // Retrieve the language from localStorage or default to 'km'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') ?? 'km';
    }

    return 'km';
  });

  useEffect(() => {
    // Save the language to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

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
