import PrintIcon from '@mui/icons-material/Print';
import { Box, GlobalStyles, IconButton } from '@mui/material';
import { ReactNode, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

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
        margin: '20px !important',
      },
    }}
  />
);

interface Props {
  children: ReactNode;
}
export const PrintWrapper = ({ children }: Props): JSX.Element => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box ref={componentRef}>
        {printStyles}
        {children}
      </Box>
      <Box display="flex" justifyContent="center">
        <IconButton onClick={handlePrint} color="primary">
          <PrintIcon />
        </IconButton>
      </Box>
    </>
  );
};
