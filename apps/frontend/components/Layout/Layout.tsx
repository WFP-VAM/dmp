import { Box, useTheme } from '@mui/material';
import React from 'react';

import { AboutModal } from 'components/AboutModal';

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
    <>
      <Box
        flexGrow={1}
        width="100vw"
        display="flex"
        flexDirection="column"
        alignItems={alignItems ?? 'left'}
        sx={{
          p: { xs: 0.5, sm: 1 },
          paddingTop: { xs: theme.spacing(3), sm: theme.spacing(5) },
        }}
        style={{ backgroundColor }}
      >
        {children}
      </Box>
      <AboutModal />
    </>
  );
};
