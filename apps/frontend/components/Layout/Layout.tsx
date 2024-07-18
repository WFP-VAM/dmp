import { Box, useTheme } from '@mui/material';
import React from 'react';

export interface LayoutProps {
  alignItems?: React.CSSProperties['alignItems'];
  backgroundColor?: string;
}

export const Layout = ({
  alignItems,
  children,
  backgroundColor = '#f9f7f7',
}: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  const theme = useTheme();

  // Warning: the maxWidth will influence the way the PDF are generated
  // TODO investigate how to reduce this value without changing th PDF display
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems={alignItems ?? 'left'}
      sx={{ p: 1 }}
      style={{ backgroundColor, paddingTop: theme.spacing(5) }}
    >
      <Box>{children}</Box>
    </Box>
  );
};
