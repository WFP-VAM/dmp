import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Box,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Logo from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useLanguageContext } from 'context';
import { useIsSignedInUserAdmin } from 'services/api/user/useUser';
import { env } from 'services/env';

const NavMenuContent = (): JSX.Element => {
  const router = useRouter();
  const isAdmin = useIsSignedInUserAdmin();

  const navMenuListItemsData = [
    { text: 'Forms', icon: StarIcon },
    { text: 'Reports', icon: ContentPasteIcon },
  ];

  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (e: SelectChangeEvent) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  const handleAdminClick = () => {
    const baseURL = env('NEXT_PUBLIC_API_BASE_URL');
    const path = new URL('/admin/login', baseURL);
    void router.push(path);
  };

  return (
    <>
      <Box margin="30px 0px 0px 20px">
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
        {isAdmin && (
          <ListItem key="admin">
            <ListItemButton onClick={handleAdminClick}>
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
      <FormControl sx={{ padding: 4 }}>
        <Select value={language} onChange={handleLanguageChange}>
          <MenuItem value="en">
            <FormattedMessage
              id="navigation.language.english"
              defaultMessage="English"
            />
          </MenuItem>
          <MenuItem value="km">
            <FormattedMessage
              id="navigation.language.khmer"
              defaultMessage="ភាសាខ្មែរ"
            />
          </MenuItem>
        </Select>
      </FormControl>
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
