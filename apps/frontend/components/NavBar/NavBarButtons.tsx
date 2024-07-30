import {
  AssignmentTurnedIn,
  ContentPaste,
  Home,
  Logout,
  Person,
} from '@mui/icons-material';
import { Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SelectLanguage from 'components/SelectLanguage';
import { apiBaseUrl } from 'services/api/client';
import { colors } from 'theme/muiTheme';
import { logout } from 'utils/logout';

const handleAdminClick = () => {
  const path = new URL('/admin/login', apiBaseUrl).toString();
  window.location.href = path;
};

const links = [
  {
    key: 1,
    linkTo: '/',
    textId: 'navigation.home',
    icon: <Home />,
  },
  {
    key: 2,
    linkTo: '/report',
    textId: 'navigation.reports',
    icon: <ContentPaste />,
  },
  {
    key: 3,
    linkTo: '/forms/search',
    textId: 'navigation.forms.header',
    icon: <AssignmentTurnedIn />,
  },
];

const NavBarButtons = () => {
  const intl = useIntl();
  const path = usePathname();
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={theme.spacing(4)}
      marginRight={1}
    >
      {links.map(x => {
        const { key, linkTo, textId, icon } = x;
        const selected = linkTo === path;

        return (
          <Link
            key={key}
            href={linkTo}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button variant="text" startIcon={icon}>
              <Typography
                fontWeight={selected ? 'bold' : undefined}
                color={selected ? colors.color3 : undefined}
                style={
                  selected
                    ? {
                        textDecoration: 'underline',
                        textDecorationThickness: '4px',
                      }
                    : undefined
                }
              >
                {intl.formatMessage({ id: textId })}
              </Typography>
            </Button>
          </Link>
        );
      })}
      <Button variant="text" startIcon={<Person />} onClick={handleAdminClick}>
        <Typography>
          {intl.formatMessage({ id: 'navigation.admin' })}
        </Typography>
      </Button>
      <SelectLanguage />
      <Button
        className="logout"
        onClick={() => {
          void logout();
        }}
        startIcon={<Logout fontSize="large" />}
      >
        <Typography>
          <FormattedMessage id="navigation.logout" />
        </Typography>
      </Button>
    </Stack>
  );
};

export default NavBarButtons;
