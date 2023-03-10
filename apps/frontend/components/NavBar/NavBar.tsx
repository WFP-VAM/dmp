import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Logo from 'next/image';
import { ReactNode, useState } from 'react';

import { isAdmin, useGetMe } from 'services/api/user/useUser';

const NavMenuContent = (): JSX.Element => {
  const user = useGetMe();
  const isAdminLoggedIn = () => {
    if (user) {
      return isAdmin(user);
    }

    return false;
  };

  const navMenuListItemsData = [
    { text: 'Forms', icon: StarIcon },
    { text: 'Reports', icon: ContentPasteIcon },
  ];

  return (
    <>
      <Box margin="30px 0px 0px 10px">
        <Logo
          src="/logo.svg"
          alt="logo"
          width={175}
          height={175}
          priority={true} //preloads image
        />
      </Box>
      <List>
        {navMenuListItemsData.map(item => (
          <ListItem key={item.text}>
            <ListItemButton
              disableTouchRipple={true}
              sx={{
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <ListItemIcon>
                <item.icon fontSize="medium" key={item.text} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 16 }}
              />
              <ExpandMoreIcon fontSize="small" sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
        {isAdminLoggedIn() && (
          <ListItem key="admin">
            <ListItemButton>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">Admin</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </>
  );
};
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
