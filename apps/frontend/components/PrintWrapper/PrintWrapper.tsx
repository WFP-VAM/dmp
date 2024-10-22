import { Box, GlobalStyles } from '@mui/material';
import { createContext, MutableRefObject, ReactNode, useContext } from 'react';

// Create the context
const PrintContext = createContext<boolean | undefined>(undefined);

// Create a custom hook to use the context
export const usePrintContext = () => {
  const context = useContext(PrintContext);
  if (context === undefined) {
    return false;
  }

  return context;
};

const printStyles = (
  <GlobalStyles
    styles={{
      '@media print': {
        'html, body': {
          fontSize: '0.9em',
          background: 'white !important',
        },
      },
      '@page': {
        size: 'A4 landscape',
      },
    }}
  />
);

interface Props {
  printRef: MutableRefObject<null>;
  isPrinting?: boolean;
  children: ReactNode;
}
export const PrintWrapper = ({
  printRef,
  isPrinting,
  children,
}: Props): JSX.Element => {
  return (
    <PrintContext.Provider value={isPrinting}>
      <Box ref={printRef}>
        {printStyles}
        {children}
      </Box>
    </PrintContext.Provider>
  );
};
