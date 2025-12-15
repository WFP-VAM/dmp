import { Stack, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// Import debounce from lodash
import React, { ReactNode } from 'react';

import NavBarButtons from './NavBarButtons';
import NavBarInfo from './NavBarInfo';

interface NavBarProps {
  children: ReactNode;
}
export const NavBar = ({ children }: NavBarProps): JSX.Element => {
  const theme = useTheme();

  const [shrink, setShrink] = React.useState<boolean>(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShrink(!entry.isIntersecting);
      },
      { threshold: [1] },
    );

    // Create a target element to observe the intersection
    // of the app bar with the viewport and decide when to shrink
    const target = document.createElement('div');
    target.style.height = '1px';
    target.style.width = '100%';
    target.style.position = 'absolute';
    target.style.top = '0';
    document.body.prepend(target);

    observer.observe(target);

    return () => {
      observer.disconnect();
      target.remove();
    };
  }, []); // No need for shrink in the dependency array

  return (
    <>
      <AppBar
        position="sticky"
        id="app-bar"
        sx={{ width: '100%', maxWidth: '100%' }}
      >
        <Toolbar disableGutters sx={{ width: '100%', maxWidth: '100%' }}>
          <Stack
            sx={{
              transition: '0.4s',
              padding: {
                xs: shrink ? theme.spacing(0.5) : theme.spacing(1),
                sm: shrink ? theme.spacing(1) : theme.spacing(2),
              },
              width: '100%',
              maxWidth: '100%',
            }}
            direction="row"
            justifyContent="space-between"
            gap={{ xs: 0.5, sm: 1 }}
          >
            <NavBarInfo shrink={shrink} />
            <NavBarButtons />
          </Stack>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
