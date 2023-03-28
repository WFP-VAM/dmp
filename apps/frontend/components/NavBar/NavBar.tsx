import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer } from '@mui/material';
import { ReactNode, useState } from 'react';

import { NavMenuContent } from './NavMenuContent';

interface Props {
  children: ReactNode;
}
export const NavBar = ({ children }: Props): JSX.Element => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <MenuIcon fontSize="medium" onClick={handleDrawerToggle} />
      <Box display="flex">
        <Box component="nav" sx={{ width: { sm: 260 }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 220,
              },
            }}
          >
            <CloseIcon onClick={handleDrawerToggle} sx={{ alignSelf: 'end' }} />
            <NavMenuContent />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
            }}
            open
          >
            <NavMenuContent />
          </Drawer>
        </Box>
        {children}
      </Box>
    </>
  );
};
