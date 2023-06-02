import { Box, GlobalStyles } from '@mui/material';
import { MutableRefObject, ReactNode } from 'react';

const printStyles = (
  <GlobalStyles
    styles={{
      '@media print': {
        'html, body': {
          fontSize: '0.9em',
        },
      },
      '@page': {
        size: 'A4 landscape',
        margin: '50px !important',
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
      {printStyles}
      {children}
    </Box>
  );
};
