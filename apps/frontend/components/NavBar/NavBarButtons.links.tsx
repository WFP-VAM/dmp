import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import {
  faChartSimple,
  faClipboardCheck,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Home } from '@mui/icons-material';

import { colors } from 'theme/muiTheme';

import type { NavLink } from './NavBarButtons.types';

export const links: NavLink[] = [
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
