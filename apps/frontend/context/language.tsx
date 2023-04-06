import { createContext, ReactNode, useContext, useState } from 'react';

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
  const [language, setLanguage] = useState('km');

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
