import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props): JSX.Element => {
  // Warning: the maxWidth will influence the way the PDF are generated
  // TODO investigate how to reduce this value without changing th PDF display
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 1 }}
    >
      <Box maxWidth={1500}>{children}</Box>
    </Box>
  );
};
