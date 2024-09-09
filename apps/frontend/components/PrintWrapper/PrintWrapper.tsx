import { Box, GlobalStyles } from '@mui/material';
import { MutableRefObject, ReactNode } from 'react';

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
  children: ReactNode;
}
export const PrintWrapper = ({ printRef, children }: Props): JSX.Element => {
  return (
    <Box ref={printRef}>
      <Box
        sx={{
          '@media print': {
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: -1,
            backgroundColor: 'white',
          },
        }}
      />
      {printStyles}
      {children}
    </Box>
  );
};
