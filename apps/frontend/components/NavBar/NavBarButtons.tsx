import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import {
  faChartSimple,
  faClipboardCheck,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Home, Logout, Person } from '@mui/icons-material';
import { Menu, MenuItem, Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SelectLanguage from 'components/SelectLanguage';
import { apiBaseUrl } from 'services/api/client';
import { colors } from 'theme/muiTheme';
import { logout } from 'utils/logout';

type NormalLink = {
  key: number;
  linkTo: string;
  textId: string;
  icon: React.ReactNode;
};

type SubMenuItem = {
  key: string;
  linkTo: string;
  textId: string;
  icon: React.ReactNode;
};

type LinkWithSubMenu = {
  key: number;
  textId: string;
  icon: React.ReactNode;
  subMenu: SubMenuItem[];
};

type NavLink = NormalLink | LinkWithSubMenu;

const handleAdminClick = () => {
  const path = new URL('/admin/login', apiBaseUrl).toString();
  window.location.href = path;
};

const links: NavLink[] = [
  {
    key: 1,
    linkTo: '/',
    textId: 'navigation.home',
    icon: <Home style={{ minWidth: '1.5rem' }} />,
  },
  {
    key: 2,
    textId: 'navigation.reports',
    icon: (
      <FontAwesomeIcon
        icon={faClipboard as IconDefinition}
        style={{ color: colors.color3, fontSize: '1rem', minWidth: '1.5rem' }}
      />
    ),
    subMenu: [
      {
        key: 'all-reports',
        linkTo: '/report',
        textId: 'navigation.reports',
        icon: (
          <FontAwesomeIcon
            icon={faClipboard as IconDefinition}
            style={{ color: colors.color3 }}
          />
        ),
      },
      {
        key: 'summary-charts',
        linkTo: '/charts',
        textId: 'navigation.charts',
        icon: (
          <FontAwesomeIcon
            icon={faChartSimple}
            style={{ color: colors.color3 }}
          />
        ),
      },
    ],
  },
  {
    key: 3,
    linkTo: '/forms/search',
    textId: 'navigation.forms.header',
    icon: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        style={{ color: colors.color3, fontSize: '1rem', minWidth: '1.5rem' }}
      />
    ),
  },
];

const isLinkWithSubMenu = (link: NavLink): link is LinkWithSubMenu => {
  return 'subMenu' in link;
};

const NavBarButtons = () => {
  const intl = useIntl();
  const path = usePathname();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuKey, setOpenMenuKey] = useState<number | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuKey(key);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenuKey(null);
  };

  const renderSubMenu = (x: LinkWithSubMenu) => {
    const { key, textId, icon, subMenu } = x;
    const selected = subMenu.some(item => item.linkTo === path);

    return (
      <React.Fragment key={key}>
        <Button
          variant="text"
          startIcon={icon}
          onClick={e => handleClick(e, key)}
          aria-controls={openMenuKey === key ? `menu-${key}` : undefined}
          aria-haspopup="true"
          aria-expanded={openMenuKey === key ? 'true' : undefined}
        >
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
        <Menu
          id={`menu-${key}`}
          anchorEl={anchorEl}
          open={openMenuKey === key}
          onClose={handleClose}
        >
          {subMenu.map(item => (
            <MenuItem
              key={item.key}
              onClick={handleClose}
              component={Link}
              href={item.linkTo}
            >
              {item.icon}
              <Typography marginLeft={1}>
                {intl.formatMessage({ id: item.textId })}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  };

  const renderNormalMenu = (x: NormalLink) => {
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
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={theme.spacing(4)}
      marginRight={1}
    >
      {links.map(x =>
        isLinkWithSubMenu(x) ? renderSubMenu(x) : renderNormalMenu(x),
      )}
      <Button
        variant="text"
        startIcon={<Person style={{ minWidth: '1.5rem' }} />}
        onClick={handleAdminClick}
      >
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
        startIcon={<Logout fontSize="large" style={{ minWidth: '1.5rem' }} />}
      >
        <Typography>
          <FormattedMessage id="navigation.logout" />
        </Typography>
      </Button>
    </Stack>
  );
};

export default NavBarButtons;
