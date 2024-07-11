import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  alignItems?: string;
  children: ReactNode;
  backgroundColor?: string;
}
export const Layout = ({
  alignItems,
  children,
  backgroundColor = '#f5f5f5',
}: Props): JSX.Element => {
  const theme = useTheme();

  // Warning: the maxWidth will influence the way the PDF are generated
  // TODO investigate how to reduce this value without changing th PDF display
  return (
    <Box
      flexGrow={1}
      display="flex"
      height="100vh"
      flexDirection="column"
      alignItems={alignItems ?? 'left'}
      sx={{ p: 1 }}
      style={{ backgroundColor, paddingTop: theme.spacing(5) }}
    >
      <Box maxWidth={1500}>{children}</Box>
    </Box>
  );
};
