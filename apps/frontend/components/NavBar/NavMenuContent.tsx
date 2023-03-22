import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import StarIcon from '@mui/icons-material/Star';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Box,
  FormControl,
  Link,
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
import { FormattedMessage, useIntl } from 'react-intl';

import { useLanguageContext } from 'context';
import { useIsSignedInUserAdmin } from 'services/api/user/useUser';
import { env } from 'services/env';

export const NavMenuContent = (): JSX.Element => {
  const intl = useIntl();
  const isAdmin = useIsSignedInUserAdmin();

  const handleAdminClick = () => {
    const baseURL = env('NEXT_PUBLIC_API_BASE_URL');
    const path = new URL('/admin/login', baseURL).toString();
    window.location.href = path;
  };

  const { language, setLanguage } = useLanguageContext();
  const handleLanguageChange = (e: SelectChangeEvent) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
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
        <ListItem key="forms">
          <Link
            href="/forms/search"
            sx={{ textDecoration: 'none', color: 'inherit' }}
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
