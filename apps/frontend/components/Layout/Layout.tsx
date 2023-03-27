import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 1 }}
    >
      <Box maxWidth={1400}>{children}</Box>
    </Box>
  );
};
