import { ContentPaste, Home, Logout, Person, Star } from '@mui/icons-material';
import { Stack, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
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
    icon: <Star />,
  },
];

interface Props {
  children: ReactNode;
}
export const NavBar = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const intl = useIntl();
  const path = usePathname();

  // TODO: not sure if these are needed for the scroll animation
  // const [state, setState] = React.useState<number>(0);

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     setState(window.scrollY);
  //   };
  //   window.addEventListener('scroll', handleScroll);

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // React.useEffect(() => {
  //   console.log({ state });
  // }, [state]);

  const handleLogoutClick = () => {
    void logout();
  };

  return (
    <>
      <AppBar position="sticky" style={{ transition: '0.4s' }} id="app-bar">
        <Toolbar disableGutters>
          <Stack
            padding={theme.spacing(2)}
            direction="row"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" gap={theme.spacing(3)}>
              <Link href="/">
                <IconButton
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                >
                  <Logo
                    src="/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                    priority={true} //preloads image
                  />
                </IconButton>
              </Link>

              <Link
                href="https://www.wfp.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                >
                  <Logo
                    src="/wfp-logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                    priority={true} //preloads image
                  />
                </IconButton>
              </Link>

              <Stack justifyContent="center">
                <Typography color="black" variant="subtitle1">
                  ប្រព័ន្ធព័ត៌មានទាន់ហេតុការណ៍
                  និងអង្កេតតាមដានស្ថានការណ៍គ្រោះមហន្តរាយ
                </Typography>
                <Typography color={colors.color3} variant="h6">
                  Platform for Real-time Impact and Situation Monitoring
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={theme.spacing(4)}
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
              <Button
                variant="text"
                startIcon={<Person />}
                onClick={handleAdminClick}
              >
                <Typography>
                  {intl.formatMessage({ id: 'navigation.admin' })}
                </Typography>
              </Button>
              <SelectLanguage />
              <Button
                className="logout"
                onClick={handleLogoutClick}
                startIcon={<Logout fontSize="large" />}
              >
                <Typography>
                  <FormattedMessage id="navigation.logout" />
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
