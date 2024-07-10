import { Stack, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
    const handleScroll = () => {
      const distanceY = document.documentElement.scrollTop;
      // TODO: increase maybe?
      const shrinkOn = 50;
      if (distanceY > shrinkOn) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar position="sticky" id="app-bar">
        <Toolbar disableGutters>
          <Stack
            style={{
              transition: '0.4s',
              padding: shrink ? 0 : theme.spacing(2),
            }}
            direction="row"
            justifyContent="space-between"
            width="100%"
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
