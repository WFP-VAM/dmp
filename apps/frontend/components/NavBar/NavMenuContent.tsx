import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Box,
  Button,
  FormControl,
  IconButton,
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
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLanguageContext } from 'context';
import { useIsSignedInUserAdmin } from 'services/api/user/useUser';
import { env } from 'services/env';
import { logout } from 'utils/logout';

export const NavMenuContent = (): JSX.Element => {
  const intl = useIntl();
  const isAdmin = useIsSignedInUserAdmin();

  const handleAdminClick = () => {
    // TODO - Use apiClient.baseUrl?
    const baseURL = env('NEXT_PUBLIC_API_BASE_URL');
    const path = new URL('/admin/login', baseURL).toString();
    window.location.href = path;
  };

  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (e: SelectChangeEvent) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
  };

  const handleLogoutClick = () => {
    void logout();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ pt: 2 }}
    >
      <Link href="/">
        <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <Logo
            src="/logo.svg"
            alt="logo"
            width={175}
            height={175}
            priority={true} //preloads image
          />
        </IconButton>
      </Link>
      <List>
        <ListItem key="home">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton
              sx={{
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" key="home" />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ id: 'navigation.home' })}
                primaryTypographyProps={{ fontSize: 16 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="forms">
          <Link
            href="/forms/search"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton
              sx={{
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <ListItemIcon>
                <StarIcon fontSize="medium" key="forms" />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ id: 'navigation.forms.header' })}
                primaryTypographyProps={{ fontSize: 16 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="reports">
          <Link
            href="/report"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton
              disableTouchRipple={true}
              sx={{
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <ListItemIcon>
                <ContentPasteIcon fontSize="medium" key="reports" />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ id: 'navigation.reports' })}
                primaryTypographyProps={{ fontSize: 16 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        {isAdmin && (
          <ListItem key="admin">
            <ListItemButton onClick={handleAdminClick}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">
                  <FormattedMessage
                    id="navigation.admin"
                    defaultMessage="Admin"
                  />
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <FormControl sx={{ padding: 4 }}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          startAdornment={<LanguageIcon />}
        >
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
      <Button
        className="logout"
        onClick={handleLogoutClick}
        sx={{
          position: 'absolute',
          bottom: 25,
          left: 25,
          fontSize: 16,
          color: 'inherit',
          backgroundColor: 'transparent',
          textTransform: 'none',
        }}
        startIcon={<LogoutIcon />}
      >
        <FormattedMessage id="navigation.logout" />
      </Button>
    </Box>
  );
};
